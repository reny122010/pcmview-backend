import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShutdownController } from './shutdown.controller';
import { ShutdownService } from './shutdown.service';
import { ShutdownSchema, SHUTDOWN_MODEL_NAME } from './shutdown.schema';
import { ShutdownRepository } from './shutdown.repository';
import { TenantSchema, TENANT_MODEL_NAME } from '../tenant/tenant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SHUTDOWN_MODEL_NAME, schema: ShutdownSchema },
      { name: TENANT_MODEL_NAME, schema: TenantSchema },
    ]),
  ],
  controllers: [ShutdownController],
  providers: [ShutdownService, ShutdownRepository],
})
export class ShutdownModule {}
