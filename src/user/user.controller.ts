import {
  Body,
  Controller,
  Post,
  Patch,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ToggleUserActiveDto } from './dto/toggle-user-disabled.dto';
import { UserInterface } from '../common/interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createUser(@Body() input: CreateUserDto): Promise<UserInterface> {
    return this.userService.createUser(input);
  }

  @Patch('update/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateUser(
    @Param('id') id: string,
    @Body() input: UpdateUserDto,
  ): Promise<UserInterface> {
    return this.userService.updateUser(id, input);
  }

  @Patch('toggle-active/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async toggleUserActive(
    @Param('id') id: string,
    @Body() input: ToggleUserActiveDto,
  ): Promise<UserInterface> {
    return this.userService.toggleUserActive(id, input);
  }
}
