import { v4 as uuidV4 } from 'uuid';

import { UserToken } from '../../infra/typeorm/entities/UserToken';
import { IUserTokensRepository } from '../IUserTokensRepository';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string, token: string, expired_at: Date): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      token,
      user_id,
      expired_at: expired_at,
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

  public async delete(id: string): Promise<void> {
    const index = this.userTokens.findIndex((user) => user.id === id);

    this.userTokens.slice(index, 1);
  }
}

export { FakeUserTokensRepository };