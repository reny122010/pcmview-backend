import { Injectable } from '@nestjs/common';
import { TenantRepository } from './tenant.repository';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Injectable()
export class TenantService {
  constructor(private readonly tenantRepository: TenantRepository) {}

  async createTenant(tenantInput: CreateTenantDto): Promise<string> {
    const tenant = await this.tenantRepository.create(tenantInput);
    return tenant.id;
  }
}
