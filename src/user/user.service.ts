import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
}
