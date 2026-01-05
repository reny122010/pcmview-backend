import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateShutdownDto {
  @IsNotEmpty({ message: 'tenantId is required' })
  @IsMongoId({ message: 'tenantId must be a valid Mongo id' })
  tenantId: string;

  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  name: string;

  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description?: string;

  @IsOptional()
  @IsDateString({}, { message: 'startDate must be a valid ISO date string' })
  startDate?: string;

  @IsOptional()
  @IsDateString({}, { message: 'endDate must be a valid ISO date string' })
  endDate?: string;
}
