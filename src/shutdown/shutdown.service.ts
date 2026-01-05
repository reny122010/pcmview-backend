import { Injectable } from '@nestjs/common';
import { ShutdownRepository } from './shutdown.repository';
import { CreateShutdownDto } from './dto/create-shutdown.dto';
import { ShutdownInterface } from '../common/interfaces/shutdown.interface';
import { SetShutdownStatusDto } from './dto/set-shutdown-status.dto';

@Injectable()
export class ShutdownService {
  constructor(private readonly shutdownRepository: ShutdownRepository) {}

  async createShutdown(input: CreateShutdownDto): Promise<ShutdownInterface> {
    return this.shutdownRepository.create(input);
  }

  async setShutdownStatus(
    id: string,
    input: SetShutdownStatusDto,
  ): Promise<ShutdownInterface> {
    return this.shutdownRepository.setStatus(id, input);
  }

  async listShutdownsByTenant(
    tenantId: string,
    page: number,
    limit: number,
    filters: { name?: string },
  ): Promise<{
    data: ShutdownInterface[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.shutdownRepository.findAllByTenantPaged(
      tenantId,
      page,
      limit,
      filters,
    );
  }

  async getShutdownById(id: string): Promise<ShutdownInterface> {
    return this.shutdownRepository.findById(id);
  }
}
