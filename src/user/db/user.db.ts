import type {
  CreateUserDto,
  UpdatePasswordDto,
  User,
} from 'src/interfaces/user.interface';

class UserDB {
  private _users: User[] = [];

  getAllUsers = async (): Promise<User[]> => this._users;

  getUserById = async (id: string): Promise<User | null> =>
    this._users.find((user) => user.id === id) || null;

  createUser = async (newUserDto: CreateUserDto) => {
    const newUser = {
      id: crypto.randomUUID(),
      login: newUserDto.login,
      password: newUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this._users.push(newUser);

    return newUser;
  };

  updateUserPassword = async (
    currentUser: User,
    updatePasswordDto: UpdatePasswordDto,
  ) => {
    currentUser.password = updatePasswordDto.newPassword;
    currentUser.version++;
    currentUser.updatedAt = Date.now();
  };

  deleteUser = async (currentUser: User) => {
    this._users = this._users.filter((user) => user !== currentUser);
  };
}

export const userDB = new UserDB();
