import {
  Body,
  Controller,
  Post,
  Patch,
  Param,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { SetPlanLimitsDto } from './dto/set-plan-limits.dto';
import { ToggleTenantActiveDto } from './dto/toggle-tenant-active.dto';
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

  @Patch('toggle-active/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async toggleTenantActive(
    @Param('id') id: string,
    @Body() payload: ToggleTenantActiveDto,
  ): Promise<TenantInterface> {
    return this.tenantService.toggleTenantActive(id, payload);
  }

  @Get('list')
  async listTenants(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('name') name?: string,
    @Query('slg') slg?: string,
  ): Promise<{
    data: TenantInterface[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.tenantService.listTenants(page, limit, { name, slg });
  }

  @Get(':id')
  async getTenantById(@Param('id') id: string): Promise<TenantInterface> {
    return this.tenantService.getTenantById(id);
  }
}
