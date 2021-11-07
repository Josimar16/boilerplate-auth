import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';
import { IUserModel } from '../models/IUserModel';

class FakeUsersRepository implements IUsersRepository {
  private users: IUserModel[] = [];

  public async create({
    name,
    email,
    password
  }: ICreateUserDTO): Promise<IUserModel> {
    const user = new IUserModel();

    Object.assign(user, {
      name,
      email,
      password,
    });

    this.users.push(user);

    return user;
  }

  public async findById(id: string): Promise<IUserModel> {
    return this.users.find((user) => user.id === id);
  }

  public async findByEmail(email: string): Promise<IUserModel> {
    return this.users.find((user) => user.email === email);
  }

  public async save(user: IUserModel): Promise<IUserModel> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id,
    );
    this.users[findIndex] = user;
    return user;
  }
}

export { FakeUsersRepository };
