import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

@EntityRepository(User)
class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor(manager: EntityManager) {
    this.ormRepository = manager.getRepository(User);
  }

  public async create({
    name,
    email,
    password
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });
    await this.ormRepository.save(user);
    return user;
  }

  public async findById(id: string): Promise<User> {
    return await this.ormRepository.findOne(id);
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.ormRepository.findOne({
      where: { email },
      select: [
        'id',
        'name',
        'email',
        'password',
        'created_at',
      ],
    });

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export { UsersRepository };
