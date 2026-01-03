import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { TenantRepository } from './tenant.repository';
import { TenantSchema, TENANT_MODEL_NAME } from './tenant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TENANT_MODEL_NAME, schema: TenantSchema },
    ]),
  ],
  controllers: [TenantController],
  providers: [TenantService, TenantRepository],
  exports: [
    TenantRepository,
    TenantService,
    MongooseModule.forFeature([
      { name: TENANT_MODEL_NAME, schema: TenantSchema },
    ]),
  ],
})
export class TenantModule {}
