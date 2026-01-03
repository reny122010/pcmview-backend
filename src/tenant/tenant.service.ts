import { Injectable } from '@nestjs/common';
import { TenantRepository } from './tenant.repository';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { TenantInterface } from '../common/interfaces/tenant.interface';

@Injectable()
export class TenantService {
  constructor(private readonly tenantRepository: TenantRepository) {}

  async createTenant(tenantInput: CreateTenantDto): Promise<TenantInterface> {
    const tenant = await this.tenantRepository.create(tenantInput);
    return tenant;
  }
}
