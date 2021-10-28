import { v4 as uuidV4 } from 'uuid';

import { UserToken } from '../../infra/typeorm/entities/UserToken';
import IUserTokensRepository from '../IUserTokensRepository';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string, expired_at: Date): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, {
      token: uuidV4(),
      user_id,
      expiredAt: expired_at,
    });
    this.userTokens.push(userToken);
    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      findToken => findToken.token === token,
    );
    return userToken;
  }
}

export { FakeUserTokensRepository };