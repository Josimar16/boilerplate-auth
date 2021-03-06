import { IUserTokensRepository } from '../IUserTokensRepository';
import { IUserTokenModel } from '../models/IUserTokenModel';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: IUserTokenModel[] = [];

  public async generate(
    user_id: string,
    token: string,
    expired_at: Date
  ): Promise<{ user_id: string, expired_at: Date }> {
    const userToken = new IUserTokenModel();

    Object.assign(userToken, {
      token,
      user_id,
      expired_at: expired_at,
    });

    this.userTokens.push(userToken);

    return { user_id, expired_at };
  }

  public async findByToken(token: string): Promise<{ id: string, user_id: string, expired_at: Date } | undefined> {
    const { id, user_id, expired_at } = this.userTokens.find(
      findToken => findToken.token === token,
    );
    return { id, user_id, expired_at };
  }

  public async delete(id: string): Promise<void> {
    const index = this.userTokens.findIndex((user) => user.id === id);

    this.userTokens.slice(index, 1);
  }
}

export { FakeUserTokensRepository };