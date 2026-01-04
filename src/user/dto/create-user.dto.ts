import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsMongoId({ message: 'tenantId must be a valid Mongo ObjectId' })
  @IsNotEmpty({ message: 'tenantId is required' })
  tenantId: string;

  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'fullName is required' })
  fullName: string;

  @IsString()
  @IsNotEmpty({ message: 'password is required' })
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  password: string;
}
