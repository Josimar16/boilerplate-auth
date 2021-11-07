import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUserModel } from './models/IUserModel';

interface IUsersRepository {
  create({ name, email, password }: ICreateUserDTO): Promise<IUserModel>;
  findById(id: string): Promise<IUserModel>;
  findByEmail(email: string): Promise<IUserModel>;
  save(user: IUserModel): Promise<IUserModel>;
}

export { IUsersRepository };
