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
import { CreateTenantDto, UpdateTenantDto } from './dto/create-tenant.dto';
import { TenantInterface } from '../common/interfaces/tenant.interface';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post('')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createTenant(
    @Body() tenantInput: CreateTenantDto,
  ): Promise<TenantInterface> {
    return await this.tenantService.createTenant(tenantInput);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateTenant(
    @Param('id') id: string,
    @Body() tenantInput: UpdateTenantDto,
  ): Promise<TenantInterface | null> {
    return await this.tenantService.updateTenant(id, tenantInput);
  }
}
