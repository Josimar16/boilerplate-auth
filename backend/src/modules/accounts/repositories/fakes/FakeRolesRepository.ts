import { ICreateRoleDTO } from '../../dtos/ICreateRoleDTO';
import { IRolesRepository } from '../IRolesRepository';
import { IRoleModel } from '../models/IRoleModel';

class FakeRolesRepository implements IRolesRepository {
  private roles: IRoleModel[] = [];

  public async create({
    name,
    description
  }: ICreateRoleDTO): Promise<IRoleModel> {
    const role = new IRoleModel();

    Object.assign(role, {
      name,
      description
    });

    this.roles.push(role);

    return role;
  }

  public async findByName(name: string): Promise<IRoleModel> {
    const role = this.roles.find(role => role.name === name);
    return role;
  }

  public async findByIds(ids: string[]): Promise<IRoleModel[]> {
    const roles = this.roles.filter(role => ids.includes(role.id));
    return roles;
  }
}

export { FakeRolesRepository };
