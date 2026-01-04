import {
  IsString,
  IsNotEmpty,
  Matches,
  IsOptional,
  ValidateNested,
  IsUrl,
  IsHexColor,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class WhiteLabelDto {
  @IsOptional()
  @IsUrl({}, { message: 'logoUrl must be a valid URL' })
  logoUrl?: string;

  @IsOptional()
  @IsHexColor({
    message: 'primaryColor must be a valid hex color (e.g. #aabbcc) TESTE',
  })
  primaryColor?: string;
}

@ValidatorConstraint({ name: 'WhiteLabelHasOne', async: false })
export class WhiteLabelHasOneConstraint implements ValidatorConstraintInterface {
  validate(value: WhiteLabelDto | undefined) {
    if (!value) return true; // optional
    return !!value.logoUrl || !!value.primaryColor;
  }

  defaultMessage() {
    return 'whiteLabel must contain at least logoUrl or primaryColor';
  }
}

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  // aceita letras, números, underline e hyphen; sem caracteres especiais
  @IsString()
  @IsNotEmpty({ message: 'slg is required' })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: 'slg must contain only letters, numbers, hyphen or underscore',
  })
  slg: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => WhiteLabelDto)
  @Validate(WhiteLabelHasOneConstraint)
  whiteLabel?: WhiteLabelDto;
}
