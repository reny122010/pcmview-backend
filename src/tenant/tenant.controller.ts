import {
  Body,
  Controller,
  Post,
  Patch,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { SetPlanLimitsDto } from './dto/set-plan-limits.dto';
import { TenantInterface } from '../common/interfaces/tenant.interface';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createTenant(
    @Body() tenantInput: CreateTenantDto,
  ): Promise<TenantInterface> {
    return await this.tenantService.createTenant(tenantInput);
  }

  @Patch('update/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateTenant(
    @Param('id') id: string,
    @Body() tenantInput: UpdateTenantDto,
  ): Promise<TenantInterface | null> {
    return await this.tenantService.updateTenant(id, tenantInput);
  }

  @Patch('set-plan-limits/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async setPlanLimits(
    @Param('id') id: string,
    @Body() limits: SetPlanLimitsDto,
  ): Promise<TenantInterface> {
    return this.tenantService.setPlanLimits(id, limits);
  }
}
