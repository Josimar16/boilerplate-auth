import { ICreateRoleDTO } from '../dtos/ICreateRoleDTO';
import { IRoleModel } from './models/IRoleModel';

interface IRolesRepository {
  create({ name, description }: ICreateRoleDTO): Promise<IRoleModel>;
  findByName(name: string): Promise<IRoleModel>;
}

export { IRolesRepository };
