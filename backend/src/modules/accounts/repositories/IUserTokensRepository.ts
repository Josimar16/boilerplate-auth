import { UserToken } from '../infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
  generate(user_id: string, expired_at: Date): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}