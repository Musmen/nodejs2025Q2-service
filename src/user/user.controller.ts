import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

import { UserService } from './user.service';

import {
  isValidNewUserDto,
  isValidUpdatePasswordDto,
  removePassword,
  removePasswords,
} from './common/helpers';

import type {
  CreateUserDto,
  UpdatePasswordDto,
  User,
} from 'src/interfaces/user.interface';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userService.getAllUsers();
    return removePasswords(users);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(
    @Param('id') id: string,
  ): Promise<Omit<User, 'password'> | null> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid userId (not UUID)');
    }

    const currentUser = await this.userService.getUserById(id);
    if (!currentUser) {
      throw new NotFoundException(`User with userId doesn't exist`);
    }

    return removePassword(currentUser);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() newUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    if (!isValidNewUserDto(newUserDto)) {
      throw new BadRequestException(
        'Invalid new user request body, does not contain valid required fields (login, password)',
      );
    }

    const currentUser = await this.userService.createUser(newUserDto);
    return removePassword(currentUser);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateUserPassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid userId (not UUID)');
    }

    if (!isValidUpdatePasswordDto(updatePasswordDto)) {
      throw new BadRequestException('Invalid user passwords (old, new)');
    }

    const currentUser = await this.userService.getUserById(id);
    if (!currentUser) {
      throw new NotFoundException(`User with userId doesn't exist`);
    }

    if (currentUser.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException(
        'Access denied. Wrong user password (old, new)',
      );
    }

    return this.userService.updateUserPassword(currentUser, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid userId (not UUID)');
    }

    const currentUser = await this.userService.getUserById(id);
    if (!currentUser) {
      throw new NotFoundException(`User with userId doesn't exist`);
    }

    return this.userService.deleteUser(currentUser);
  }
}
