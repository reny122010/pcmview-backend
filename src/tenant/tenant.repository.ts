import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { TenantInterface } from '../common/interfaces/tenant.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TenantDocument, TENANT_MODEL_NAME } from './tenant.schema';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Injectable()
export class TenantRepository {
  private readonly logger = new Logger(TenantRepository.name);

  constructor(
    @InjectModel(TENANT_MODEL_NAME)
    private readonly tenantModel: Model<TenantDocument>,
  ) {}

  async create(data: CreateTenantDto): Promise<TenantInterface> {
    const docToInsert = { ...data };

    try {
      // verificação simples e rápida antes do insert
      const existing = await this.tenantModel
        .findOne({ slg: data.slg })
        .lean()
        .exec();
      if (existing) {
        throw new BadRequestException(['slg already exists']);
      }

      const created = await new this.tenantModel(docToInsert).save();
      return created as unknown as TenantInterface;
    } catch (err: unknown) {
      if (
        err &&
        typeof err === 'object' &&
        'code' in err &&
        (err as { code?: number }).code === 11000
      ) {
        this.logger.warn(
          'Duplicate key error when creating tenant',
          err as any,
        );
        throw new BadRequestException(['slg already exists']);
      }

      throw err;
    }
  }
}
