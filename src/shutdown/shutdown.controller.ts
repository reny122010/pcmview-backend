import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ShutdownService } from './shutdown.service';
import { CreateShutdownDto } from './dto/create-shutdown.dto';
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
}
