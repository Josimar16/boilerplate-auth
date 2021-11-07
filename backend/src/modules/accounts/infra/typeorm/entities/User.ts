import {
  Column,
  Entity,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { IUserModel } from '../../../repositories/models/IUserModel';

@Entity({ name: 'users', schema: 'auth' })
class User extends BaseEntity implements IUserModel {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password', select: false })
  password?: string;

  @UpdateDateColumn({ nullable: true })
  updated_at?: Date;
}

export { User };
