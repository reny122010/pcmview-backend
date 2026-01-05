import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class SetShutdownStatusDto {
  @IsNotEmpty({ message: 'status is required' })
  @IsString({ message: 'status must be a string' })
  @IsIn(['open', 'closed', 'started', 'paused', 'finished'], {
    message: 'status must be one of: open, closed, started, paused, finished',
  })
  status: 'open' | 'closed' | 'started' | 'paused' | 'finished';
}
