import { IPermissionModel } from "./IPermissionModel";
import { IRoleModel } from "./IRoleModel";

export class IUserModel {
  id: string;
  name: string;
  email: string;
  password?: string;
  roles: IRoleModel[];
  permissions: IPermissionModel[];
  created_at: Date;
  updated_at?: Date;
}