import { IUserTokenModel } from '../../../repositories/models/IUserTokenModel';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { User } from './User';

@Entity({ name: 'users_token', schema: 'auth' })
class UserToken extends BaseEntity implements IUserTokenModel {
  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  token: string;

  @Column()
  expired_at: Date;
}

export { UserToken };
