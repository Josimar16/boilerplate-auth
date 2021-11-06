import { IUserTokensRepository } from "../../../repositories/IUserTokensRepository";
import { EntityManager, EntityRepository, Repository } from "typeorm";
import { UserToken } from "../entities/UserToken";


@EntityRepository(UserToken)
class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor(manager: EntityManager) {
    this.ormRepository = manager.getRepository(UserToken);
  }

  public async generate(
    user_id: string,
    token: string,
    expired_at: Date
  ): Promise<{ user_id: string, expired_at: Date }> {
    const userToken = this.ormRepository.create({
      user_id,
      token,
      expired_at
    });

    await this.ormRepository.save(userToken);

    return { user_id, expired_at };
  }

  public async findByToken(
    token: string
  ): Promise<{ id: string, user_id: string, expired_at: Date } | undefined> {
    const { id, user_id, expired_at } = await this.ormRepository.findOne({
      where: { token }
    });

    return { id, user_id, expired_at };
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export { UserTokensRepository };