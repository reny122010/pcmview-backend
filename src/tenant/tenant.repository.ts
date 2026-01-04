import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { TenantInterface } from '../common/interfaces/tenant.interface';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TenantDocument, TENANT_MODEL_NAME } from './tenant.schema';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { SetPlanLimitsDto } from './dto/set-plan-limits.dto';
import { ToggleTenantActiveDto } from './dto/toggle-tenant-active.dto';
import { stripMongooseProps } from '../common/utils/mongoose-utils';

@Injectable()
export class TenantRepository {
  private readonly logger = new Logger(TenantRepository.name);

  constructor(
    @InjectModel(TENANT_MODEL_NAME)
    private readonly tenantModel: Model<TenantDocument>,
  ) {}

  async create(data: CreateTenantDto): Promise<TenantInterface> {
    const existing = await this.tenantModel
      .findOne({ slg: data.slg })
      .lean()
      .exec();
    if (existing) throw new BadRequestException(['slg already exists']);

    const plain = (await this.tenantModel.create(data)).toObject({
      virtuals: true,
    }) as unknown as TenantInterface;

    stripMongooseProps(plain as any);
    return plain;
  }

  async update(id: string, data: UpdateTenantDto): Promise<TenantInterface> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(['invalid tenant id']);
    }

    const existing = await this.tenantModel
      .findOneAndUpdate({ _id: id, active: true }, data, { new: true })
      .lean()
      .exec();

    if (!existing) {
      throw new BadRequestException(['tenant not found or inactive']);
    }

    const plain = existing as unknown as TenantInterface;
    stripMongooseProps(plain as any);
    return plain;
  }

  async setPlanLimits(
    id: string,
    data: SetPlanLimitsDto,
  ): Promise<TenantInterface> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(['invalid tenant id']);
    }

    const existing = await this.tenantModel
      .findByIdAndUpdate(id, data, { new: true })
      .lean()
      .exec();

    if (!existing) {
      throw new BadRequestException(['tenant not found']);
    }

    const plain = existing as unknown as TenantInterface;
    stripMongooseProps(plain as any);
    return plain;
  }

  async toggleActive(
    id: string,
    data: ToggleTenantActiveDto,
  ): Promise<TenantInterface> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(['invalid tenant id']);
    }

    const existing = await this.tenantModel
      .findByIdAndUpdate(id, { active: data.active }, { new: true })
      .lean()
      .exec();

    if (!existing) {
      throw new BadRequestException(['tenant not found']);
    }

    const plain = existing as unknown as TenantInterface;
    stripMongooseProps(plain as any);
    return plain;
  }
}
