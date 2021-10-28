import { v4 as uuidV4 } from 'uuid';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    id,
    name,
    email,
    password
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id,
      name,
      email,
      password,
    });

    this.users.push(user);

    return user;
  }

  public async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  public async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id,
    );
    this.users[findIndex] = user;
    return user;
  }
}

export { FakeUsersRepository };
