import { UserToken } from '../infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
  generate(user_id: string, token: string, expired_at: Date): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
  delete(id: string): Promise<void>;
}