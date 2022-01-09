import { ICreatePermissionDTO } from '../../../dtos/ICreatePermissionDTO';
import { IPermissionsRepository } from '../../../repositories/IPermissionsRepository';
import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { Permission } from '../entities/Permission';

@EntityRepository(Permission)
class PermissionsRepository implements IPermissionsRepository {
  private ormRepository: Repository<Permission>;

  constructor(manager: EntityManager) {
    this.ormRepository = manager.getRepository(Permission);
  }

  public async create({
    name,
    description
  }: ICreatePermissionDTO): Promise<Permission> {
    const permission = this.ormRepository.create({ name, description });
    await this.ormRepository.save(permission);
    return permission;
  }

  public async findByName(name: string): Promise<Permission> {
    return await this.ormRepository.findOne(name);
  }

  public async findByIds(ids: string[]): Promise<Permission[]> {
    const permissions = await this.ormRepository.findByIds(ids);
    return permissions;
  }
}

export { PermissionsRepository };
