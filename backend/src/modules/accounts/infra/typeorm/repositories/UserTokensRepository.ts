import IUserTokensRepository from "src/modules/accounts/repositories/IUserTokensRepository";
import { EntityManager, EntityRepository, Repository } from "typeorm";
import { UserToken } from "../entities/UserToken";


@EntityRepository(UserToken)
class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor(manager: EntityManager) {
    this.ormRepository = manager.getRepository(UserToken);
  }

  public async generate(user_id: string, token: string, expired_at: Date): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
      token,
      expired_at
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({ where: { token } });

    return userToken;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export { UserTokensRepository };