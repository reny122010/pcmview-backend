import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { USER_MODEL_NAME, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ToggleUserActiveDto } from './dto/toggle-user-disabled.dto';
import { UserInterface } from '../common/interfaces/user.interface';
import { stripMongooseProps } from '../common/utils/mongoose-utils';
import * as bcrypt from 'bcryptjs';
import { TENANT_MODEL_NAME, TenantDocument } from '../tenant/tenant.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(USER_MODEL_NAME)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(TENANT_MODEL_NAME)
    private readonly tenantModel: Model<TenantDocument>,
  ) {}

  async create(data: CreateUserDto): Promise<UserInterface> {
    if (!isValidObjectId(data.tenantId)) {
      throw new BadRequestException(['invalid tenant id']);
    }

    const tenant = await this.tenantModel
      .findById(data.tenantId)
      .select('_id')
      .lean()
      .exec();
    if (!tenant) {
      throw new BadRequestException(['tenant not found']);
    }

    const emailExisting = await this.userModel
      .findOne({ email: data.email })
      .lean()
      .exec();
    if (emailExisting) {
      throw new BadRequestException(['email already in use']);
    }

    let created!: UserDocument;
    try {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(data.password, salt);

      created = await this.userModel.create({
        tenantId: data.tenantId,
        fullName: data.fullName,
        email: data.email,
        passwordHash,
      });
    } catch {
      throw new BadRequestException(['failed to generate salt']);
    }

    const plain = created.toObject({ virtuals: true }) as unknown as {
      id: string;
      tenantId: { toString(): string };
      fullName: string;
      email: string;
      active: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
    const user = {
      id: plain.id,
      tenantId: plain.tenantId.toString(),
      fullName: plain.fullName,
      email: plain.email,
      active: plain.active,
      createdAt: plain.createdAt.toISOString(),
      updatedAt: plain.updatedAt.toISOString(),
    } as UserInterface;

    stripMongooseProps(user as any);
    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<UserInterface> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(['invalid user id']);
    }

    const existingEmail = data.email
      ? await this.userModel
          .findOne({ _id: { $ne: id }, email: data.email })
          .lean()
          .exec()
      : null;

    if (existingEmail) {
      throw new BadRequestException(['email already in use']);
    }

    const updated = await this.userModel
      .findByIdAndUpdate(id, data, { new: true })
      .lean()
      .exec();

    if (!updated) {
      throw new BadRequestException(['user not found']);
    }

    const plain = updated as unknown as {
      id: string;
      tenantId: { toString(): string };
      fullName: string;
      email: string;
      active: boolean;
      createdAt: Date;
      updatedAt: Date;
    };

    const user: UserInterface = {
      id: plain.id,
      tenantId: plain.tenantId.toString(),
      fullName: plain.fullName,
      email: plain.email,
      active: plain.active,
      createdAt: plain.createdAt.toISOString(),
      updatedAt: plain.updatedAt.toISOString(),
    };

    stripMongooseProps(user as any);
    return user;
  }

  async toggleActive(
    id: string,
    payload: ToggleUserActiveDto,
  ): Promise<UserInterface> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(['invalid user id']);
    }

    const updated = await this.userModel
      .findByIdAndUpdate(id, { active: payload.active }, { new: true })
      .lean()
      .exec();

    if (!updated) {
      throw new BadRequestException(['user not found']);
    }

    const plain = updated as unknown as {
      id: string;
      tenantId: { toString(): string };
      fullName: string;
      email: string;
      active: boolean;
      createdAt: Date;
      updatedAt: Date;
    };

    const user: UserInterface = {
      id: plain.id,
      tenantId: plain.tenantId.toString(),
      fullName: plain.fullName,
      email: plain.email,
      active: plain.active,
      createdAt: plain.createdAt.toISOString(),
      updatedAt: plain.updatedAt.toISOString(),
    };

    stripMongooseProps(user as any);
    return user;
  }

  async findAllByTenantPaged(
    tenantId: string,
    page: number,
    limit: number,
    filters: { fullName?: string; email?: string },
  ): Promise<{
    data: UserInterface[];
    total: number;
    page: number;
    limit: number;
  }> {
    if (!isValidObjectId(tenantId)) {
      throw new BadRequestException(['invalid tenant id']);
    }

    const query: Record<string, any> = { tenantId };

    if (filters.fullName) {
      query.fullName = { $regex: filters.fullName, $options: 'i' };
    }

    if (filters.email) {
      query.email = { $regex: filters.email, $options: 'i' };
    }

    const [items, total] = await Promise.all([
      this.userModel
        .find(query)
        .select('id tenantId fullName email active createdAt updatedAt')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
        .exec(),
      this.userModel.countDocuments(query).exec(),
    ]);

    const data: UserInterface[] = items.map((doc) => {
      const plain = doc as unknown as {
        id: string;
        tenantId: { toString(): string };
        fullName: string;
        email: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
      };

      const user: UserInterface = {
        id: plain.id,
        tenantId: plain.tenantId.toString(),
        fullName: plain.fullName,
        email: plain.email,
        active: plain.active,
        createdAt: plain.createdAt.toISOString(),
        updatedAt: plain.updatedAt.toISOString(),
      };

      stripMongooseProps(user as any);
      return user;
    });

    return { data, total, page, limit };
  }

  async findById(id: string): Promise<UserInterface> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(['invalid user id']);
    }

    const existing = await this.userModel.findById(id).lean().exec();

    if (!existing) {
      throw new BadRequestException(['user not found']);
    }

    const plain = existing as unknown as {
      id: string;
      tenantId: { toString(): string };
      fullName: string;
      email: string;
      active: boolean;
      createdAt: Date;
      updatedAt: Date;
    };

    const user: UserInterface = {
      id: plain.id,
      tenantId: plain.tenantId.toString(),
      fullName: plain.fullName,
      email: plain.email,
      active: plain.active,
      createdAt: plain.createdAt.toISOString(),
      updatedAt: plain.updatedAt.toISOString(),
    };

    stripMongooseProps(user as any);
    return user;
  }
}
