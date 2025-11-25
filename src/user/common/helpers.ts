import type {
  CreateUserDto,
  UpdatePasswordDto,
  User,
} from 'src/interfaces/user.interface';

export const parseUser = (user): User => ({
  ...user,
  createdAt: Number(user.createdAt),
  updatedAt: Number(user.updatedAt),
});

export const removePassword = (user: User): Omit<User, 'password'> => {
  const result = { ...user };

  if ('password' in result) {
    delete result.password;
  }
  return result;
};

export const removePasswords = (usersData: User[]): Omit<User, 'password'>[] =>
  usersData.map(removePassword);

export const isValidNewUserDto = (newUserDto: CreateUserDto) => {
  const { login, password } = newUserDto;
  if (
    !login ||
    !password ||
    typeof login !== 'string' ||
    typeof password !== 'string'
  )
    return false;

  return true;
};

export const isValidUpdatePasswordDto = (
  updatePasswordDto: UpdatePasswordDto,
) => {
  const { newPassword, oldPassword } = updatePasswordDto;
  if (
    !newPassword ||
    !oldPassword ||
    typeof newPassword !== 'string' ||
    typeof oldPassword !== 'string'
  )
    return false;

  return true;
};
