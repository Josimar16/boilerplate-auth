import { User } from "../infra/typeorm/entities/User";

class IResponseTokenDTO {
  token: string;
  refresh_token: string;
  user: Partial<User>;
  reset_token_password: string;
}

export { IResponseTokenDTO }