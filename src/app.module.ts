import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantController } from './tenant/tenant.controller';
import { TenantService } from './tenant/tenant.service';
import { TenantModule } from './tenant/tenant.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, TenantModule],
  controllers: [AppController, TenantController],
  providers: [AppService, TenantService],
})
export class AppModule {}
