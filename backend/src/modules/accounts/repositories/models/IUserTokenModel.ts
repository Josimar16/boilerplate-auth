import { IUserModel } from "./IUserModel";

export class IUserTokenModel {
  id: string;
  user_id: string;
  user: IUserModel;
  token: string;
  expired_at: Date;
  created_at: Date;
}