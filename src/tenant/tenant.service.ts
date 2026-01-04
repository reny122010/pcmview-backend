import { Injectable } from '@nestjs/common';
import { TenantRepository } from './tenant.repository';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { SetPlanLimitsDto } from './dto/set-plan-limits.dto';
import { TenantInterface } from '../common/interfaces/tenant.interface';

@Injectable()
export class TenantService {
  constructor(private readonly tenantRepository: TenantRepository) {}

  async createTenant(tenantInput: CreateTenantDto): Promise<TenantInterface> {
    const tenant = await this.tenantRepository.create(tenantInput);
    return tenant;
  }

  async updateTenant(
    id: string,
    tenantInput: UpdateTenantDto,
  ): Promise<TenantInterface | null> {
    const tenant = await this.tenantRepository.update(id, tenantInput);
    return tenant;
  }

  async setPlanLimits(
    id: string,
    limits: SetPlanLimitsDto,
  ): Promise<TenantInterface> {
    return this.tenantRepository.setPlanLimits(id, limits);
  }
}
