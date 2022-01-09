import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { IRoleModel } from "../../../repositories/models/IRoleModel";
import { BaseEntity } from "./BaseEntity";
import { Permission } from "./Permission";

@Entity({ schema: 'auth' })
export class Role extends BaseEntity implements IRoleModel {
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "roles_permissions",
    joinColumns: [{ name: "role_id" }],
    inverseJoinColumns: [{ name: "permission_id" }]
  })
  permissions: Permission[];
}