import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ToggleUserActiveDto } from './dto/toggle-user-disabled.dto';
import { UserInterface } from '../common/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(input: CreateUserDto): Promise<UserInterface> {
    return this.userRepository.create(input);
  }

  async updateUser(id: string, input: UpdateUserDto): Promise<UserInterface> {
    return this.userRepository.update(id, input);
  }

  async toggleUserActive(
    id: string,
    input: ToggleUserActiveDto,
  ): Promise<UserInterface> {
    return this.userRepository.toggleActive(id, input);
  }

  async listUsersByTenant(
    tenantId: string,
    page: number,
    limit: number,
    filters: { fullName?: string; email?: string },
  ): Promise<{
    data: UserInterface[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.userRepository.findAllByTenantPaged(
      tenantId,
      page,
      limit,
      filters,
    );
  }

  async getUserById(id: string): Promise<UserInterface> {
    return this.userRepository.findById(id);
  }
}
