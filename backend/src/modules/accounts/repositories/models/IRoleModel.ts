import { IPermissionModel } from "./IPermissionModel";

export class IRoleModel {
  id: string;
  name: string;
  description: string;
  permissions: IPermissionModel[];
  created_at: Date;
}