import { IUserModel } from "../repositories/models/IUserModel";

class IResponseTokenDTO {
  token: string;
  refresh_token: string;
  user: Partial<IUserModel>;
  reset_token_password: string;
}

export { IResponseTokenDTO }