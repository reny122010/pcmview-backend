import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserSchema, USER_MODEL_NAME } from './user.schema';
import { TenantSchema, TENANT_MODEL_NAME } from '../tenant/tenant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USER_MODEL_NAME,
        schema: UserSchema,
      },
      {
        name: TENANT_MODEL_NAME,
        schema: TenantSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
