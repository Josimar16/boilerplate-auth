import { ICreatePermissionDTO } from '../dtos/ICreatePermissionDTO';
import { IPermissionModel } from './models/IPermissionModel';

interface IPermissionsRepository {
  create({ name, description }: ICreatePermissionDTO): Promise<IPermissionModel>;
  findByName(name: string): Promise<IPermissionModel>;
  findByIds(ids: string[]): Promise<IPermissionModel[]>;
}

export { IPermissionsRepository };
