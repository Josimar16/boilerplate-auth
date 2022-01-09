import { ICreateRoleDTO } from '../dtos/ICreateRoleDTO';
import { IRoleModel } from './models/IRoleModel';

interface IRolesRepository {
  create({ name, description }: ICreateRoleDTO): Promise<IRoleModel>;
  findByName(name: string): Promise<IRoleModel>;
  findByIds(ids: string[]): Promise<IRoleModel[]>;
}

export { IRolesRepository };
