export interface IUserTokensRepository {
  generate(
    user_id: string,
    token: string,
    expired_at: Date
  ): Promise<{ user_id: string, expired_at: Date }>;
  findByToken(token: string): Promise<{ id: string, user_id: string, expired_at: Date } | undefined>;
  delete(id: string): Promise<void>;
}