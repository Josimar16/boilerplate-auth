import IUserTokensRepository from "src/modules/accounts/repositories/IUserTokensRepository";
import { EntityManager, EntityRepository, Repository } from "typeorm";
import { UserToken } from "../entities/UserToken";


@EntityRepository(UserToken)
class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor(manager: EntityManager) {
    this.ormRepository = manager.getRepository(UserToken);
  }

  public async generate(user_id: string, expired_at: Date): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
      expiredAt: expired_at
    });
    await this.ormRepository.save(userToken);
    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({ where: { token } });
    return userToken;
  }
}

export { UserTokensRepository };