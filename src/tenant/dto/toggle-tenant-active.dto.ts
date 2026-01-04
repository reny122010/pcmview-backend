import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ToggleTenantActiveDto {
  @IsNotEmpty({ message: 'active is required' })
  @IsBoolean({ message: 'active must be a boolean' })
  active: boolean;
}
