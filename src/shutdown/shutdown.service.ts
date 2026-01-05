import { Injectable } from '@nestjs/common';
import { ShutdownRepository } from './shutdown.repository';
import { CreateShutdownDto } from './dto/create-shutdown.dto';
import { ShutdownInterface } from '../common/interfaces/shutdown.interface';

@Injectable()
export class ShutdownService {
  constructor(private readonly shutdownRepository: ShutdownRepository) {}

  async createShutdown(input: CreateShutdownDto): Promise<ShutdownInterface> {
    return this.shutdownRepository.create(input);
  }
}
