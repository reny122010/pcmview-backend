import {
  Body,
  Controller,
  Post,
  Patch,
  Param,
  Get,
  Query,
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

  @Get('list/:tenantId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async listShutdownsByTenant(
    @Param('tenantId') tenantId: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('name') name?: string,
  ): Promise<{
    data: ShutdownInterface[];
    total: number;
    page: number;
    limit: number;
  }> {
    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.max(parseInt(limit, 10) || 10, 1);

    return this.shutdownService.listShutdownsByTenant(
      tenantId,
      pageNum,
      limitNum,
      { name },
    );
  }

  @Get(':id')
  async getShutdownById(@Param('id') id: string): Promise<ShutdownInterface> {
    return this.shutdownService.getShutdownById(id);
  }
}
