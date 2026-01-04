import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class SetPlanLimitsDto {
  @IsNotEmpty({ message: 'maxUsers is required' })
  @IsInt({ message: 'maxUsers must be an integer' })
  @Min(0, { message: 'maxUsers must be greater or equal to 0' })
  maxUsers: number;

  @IsNotEmpty({ message: 'maxShutdowns is required' })
  @IsInt({ message: 'maxShutdowns must be an integer' })
  @Min(0, { message: 'maxShutdowns must be greater or equal to 0' })
  maxShutdowns: number;
}
