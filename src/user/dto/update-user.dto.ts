import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty({ message: 'email is required' })
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'fullName is required' })
  fullName?: string;
}
