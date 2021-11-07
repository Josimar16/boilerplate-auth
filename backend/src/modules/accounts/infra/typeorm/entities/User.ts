import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { IUserModel } from '../../../repositories/models/IUserModel';
import { Role } from './Role';
import { Permission } from './Permission';

@Entity({ name: 'users', schema: 'auth' })
class User extends BaseEntity implements IUserModel {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password', select: false })
  password?: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: "users_roles",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "role_id" }],
  })
  roles: Role[];

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "users_permissions",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "permission_id" }],
  })
  permissions: Permission[];

  @UpdateDateColumn({ nullable: true })
  updated_at?: Date;
}

export { User };
