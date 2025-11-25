import { Injectable } from '@nestjs/common';

import { prisma } from 'prisma/prisma';

import { parseUser } from './common/helpers';

import type {
  CreateUserDto,
  UpdatePasswordDto,
  User,
} from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  getAllUsers = async (): Promise<User[]> => {
    const users = await prisma.user.findMany();
    return users.map(parseUser);
  };

  getUserById = async (id: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return parseUser(user);
  };

  createUser = async ({ login, password }: CreateUserDto): Promise<User> => {
    const newUser = await prisma.user.create({
      data: {
        login,
        password,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        version: 1,
      },
    });
    return parseUser(newUser);
  };

  updateUserPassword = async (
    { id, version }: User,
    { newPassword }: UpdatePasswordDto,
  ): Promise<void> => {
    await prisma.user.update({
      where: { id },
      data: {
        password: newPassword,
        version: version + 1,
        updatedAt: Date.now(),
      },
    });
  };

  deleteUser = async ({ id }: User): Promise<void> => {
    await prisma.user.delete({
      where: { id },
    });
  };
}
