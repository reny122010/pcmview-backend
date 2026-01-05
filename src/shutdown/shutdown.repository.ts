import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { SHUTDOWN_MODEL_NAME, ShutdownDocument } from './shutdown.schema';
import { CreateShutdownDto } from './dto/create-shutdown.dto';
import { ShutdownInterface } from '../common/interfaces/shutdown.interface';
import { stripMongooseProps } from '../common/utils/mongoose-utils';
import { TENANT_MODEL_NAME, TenantDocument } from '../tenant/tenant.schema';

@Injectable()
export class ShutdownRepository {
  constructor(
    @InjectModel(SHUTDOWN_MODEL_NAME)
    private readonly shutdownModel: Model<ShutdownDocument>,
    @InjectModel(TENANT_MODEL_NAME)
    private readonly tenantModel: Model<TenantDocument>,
  ) {}

  async create(data: CreateShutdownDto): Promise<ShutdownInterface> {
    if (!isValidObjectId(data.tenantId)) {
      throw new BadRequestException(['invalid tenant id']);
    }

    const tenant = await this.tenantModel
      .findById(data.tenantId)
      .select('_id maxShutdowns')
      .lean()
      .exec();

    if (!tenant) {
      throw new BadRequestException(['tenant not found']);
    }

    const currentCount = await this.shutdownModel
      .countDocuments({ tenantId: data.tenantId })
      .exec();

    const maxShutdowns =
      (tenant as { maxShutdowns?: number }).maxShutdowns ?? 0;

    if (maxShutdowns > 0 && currentCount >= maxShutdowns) {
      throw new BadRequestException(['max shutdowns reached for tenant']);
    }

    const created = await this.shutdownModel.create({
      tenantId: data.tenantId,
      name: data.name,
      description: data.description,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    });

    const plain = created.toObject({ virtuals: true }) as unknown as {
      id: string;
      tenantId: { toString(): string };
      name: string;
      description?: string;
      startDate?: Date | null;
      endDate?: Date | null;
      createdAt: Date;
      updatedAt: Date;
    };

    const shutdown: ShutdownInterface = {
      id: plain.id,
      tenantId: plain.tenantId.toString(),
      name: plain.name,
      description: plain.description,
      startDate: plain.startDate ? plain.startDate.toISOString() : null,
      endDate: plain.endDate ? plain.endDate.toISOString() : null,
      createdAt: plain.createdAt.toISOString(),
      updatedAt: plain.updatedAt.toISOString(),
    };

    stripMongooseProps(shutdown as any);
    return shutdown;
  }
}
