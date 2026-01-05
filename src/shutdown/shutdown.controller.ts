import {
  Body,
  Controller,
  Post,
  Patch,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ShutdownService } from './shutdown.service';
import { CreateShutdownDto } from './dto/create-shutdown.dto';
import { SetShutdownStatusDto } from './dto/set-shutdown-status.dto';
import { ShutdownInterface } from '../common/interfaces/shutdown.interface';

@Controller('shutdown')
export class ShutdownController {
  constructor(private readonly shutdownService: ShutdownService) {}

  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createShutdown(
    @Body() input: CreateShutdownDto,
  ): Promise<ShutdownInterface> {
    return this.shutdownService.createShutdown(input);
  }

  @Patch('set-status/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async setShutdownStatus(
    @Param('id') id: string,
    @Body() input: SetShutdownStatusDto,
  ): Promise<ShutdownInterface> {
    return this.shutdownService.setShutdownStatus(id, input);
  }
}
