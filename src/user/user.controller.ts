import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInterface } from '../common/interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createUser(@Body() input: CreateUserDto): Promise<UserInterface> {
    return this.userService.createUser(input);
  }
}
