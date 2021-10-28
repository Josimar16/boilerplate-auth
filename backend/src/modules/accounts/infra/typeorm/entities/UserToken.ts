import { v4 as uuidV4 } from 'uuid';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'usuario_token', schema: 'auth' })
class UserToken {
  @PrimaryColumn({ name: 'usuario_id' })
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  user: User;

  @PrimaryColumn()
  token: string;

  @Column({ name: 'expira_em' })
  expiredAt: Date;

  constructor() {
    if (!this.token) {
      this.token = uuidV4();
    }
  }
}

export { UserToken };
