import { ICreatePermissionDTO } from '../../dtos/ICreatePermissionDTO';
import { IPermissionsRepository } from '../IPermissionsRepository';
import { IPermissionModel } from '../models/IPermissionModel';

class FakePermissionsRepository implements IPermissionsRepository {
  private permissions: IPermissionModel[] = [];

  public async create({
    name,
    description
  }: ICreatePermissionDTO): Promise<IPermissionModel> {
    const permission = new IPermissionModel();

    Object.assign(permission, {
      name,
      description
    });

    this.permissions.push(permission);

    return permission;
  }

  public async findByName(name: string): Promise<IPermissionModel> {
    const permission = this.permissions.find(permission => permission.name === name);
    return permission;
  }

  public async findByIds(ids: string[]): Promise<IPermissionModel[]> {
    const permissions = this.permissions.filter(permission => ids.includes(permission.id));
    return permissions;
  }
}

export { FakePermissionsRepository };
