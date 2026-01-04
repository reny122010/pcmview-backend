import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Validate,
  ValidateNested,
} from 'class-validator';
import { WhiteLabelDto, WhiteLabelHasOneConstraint } from './create-tenant.dto';

export class UpdateTenantDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  name?: string;

  // aceita letras, números, underline e hyphen; sem caracteres especiais
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'slg is required' })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: 'slg must contain only letters, numbers, hyphen or underscore',
  })
  slg?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => WhiteLabelDto)
  @Validate(WhiteLabelHasOneConstraint)
  whiteLabel?: WhiteLabelDto;
}
