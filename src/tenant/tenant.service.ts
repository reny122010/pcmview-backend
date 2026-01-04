import { Injectable } from '@nestjs/common';
import { TenantRepository } from './tenant.repository';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { SetPlanLimitsDto } from './dto/set-plan-limits.dto';
import { ToggleTenantActiveDto } from './dto/toggle-tenant-active.dto';
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

  async toggleTenantActive(
    id: string,
    payload: ToggleTenantActiveDto,
  ): Promise<TenantInterface> {
    return this.tenantRepository.toggleActive(id, payload);
  }

  async listTenants(
    page: number,
    limit: number,
    filters: { name?: string; slg?: string },
  ): Promise<{
    data: TenantInterface[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.tenantRepository.findAllPaged(page, limit, filters);
  }

  async getTenantById(id: string): Promise<TenantInterface> {
    return this.tenantRepository.findById(id);
  }
}
