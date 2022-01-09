import { ICreateRoleDTO } from '../../../dtos/ICreateRoleDTO';
import { IRolesRepository } from '../../../repositories/IRolesRepository';
import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { Role } from '../entities/Role';

@EntityRepository(Role)
class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  constructor(manager: EntityManager) {
    this.ormRepository = manager.getRepository(Role);
  }

  public async create({
    name,
    description
  }: ICreateRoleDTO): Promise<Role> {
    const role = this.ormRepository.create({ name, description });
    await this.ormRepository.save(role);
    return role;
  }

  public async findByName(name: string): Promise<Role> {
    return await this.ormRepository.findOne(name);
  }

  public async findByIds(ids: string[]): Promise<Role[]> {
    const roles = await this.ormRepository.findByIds(ids);
    return roles;
  }
}

export { RolesRepository };
