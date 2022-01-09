import { Column, Entity } from "typeorm";
import { IPermissionModel } from "../../../repositories/models/IPermissionModel";
import { BaseEntity } from "./BaseEntity";

@Entity({ schema: 'auth' })
export class Permission extends BaseEntity implements IPermissionModel {
  @Column()
  name: string;

  @Column()
  description: string;
}