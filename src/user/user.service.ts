import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInterface } from '../common/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(input: CreateUserDto): Promise<UserInterface> {
    return this.userRepository.create(input);
  }
}
