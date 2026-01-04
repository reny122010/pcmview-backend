import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { USER_MODEL_NAME, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
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
      const salt: string = (await bcrypt.genSalt(10)) as string;
      const passwordHash: string = (await bcrypt.hash(
        data.password,
        salt,
      )) as string;

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
      createdAt: Date;
      updatedAt: Date;
    };
    const user = {
      id: plain.id,
      tenantId: plain.tenantId.toString(),
      fullName: plain.fullName,
      email: plain.email,
      createdAt: plain.createdAt.toISOString(),
      updatedAt: plain.updatedAt.toISOString(),
    } as UserInterface;

    stripMongooseProps(user as any);
    return user;
  }
}
