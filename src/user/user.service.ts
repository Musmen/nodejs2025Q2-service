import { Injectable } from '@nestjs/common';

import { userDB } from './db/user.db';

import type {
  CreateUserDto,
  UpdatePasswordDto,
  User,
} from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  getAllUsers = async () => userDB.getAllUsers();

  getUserById = async (id: string): Promise<User | null> =>
    userDB.getUserById(id);

  createUser = async (newUserDto: CreateUserDto) =>
    userDB.createUser(newUserDto);

  updateUserPassword = async (
    currentUser: User,
    updatePasswordDto: UpdatePasswordDto,
  ) => userDB.updateUserPassword(currentUser, updatePasswordDto);

  deleteUser = async (currentUser: User) => userDB.deleteUser(currentUser);
}
