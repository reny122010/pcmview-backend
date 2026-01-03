import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
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
}
