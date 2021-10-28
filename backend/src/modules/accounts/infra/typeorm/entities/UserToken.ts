import { v4 as uuidV4 } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'usuario_token', schema: 'auth' })
class UserToken {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'usuario_id' })
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  user: User;

  @Column()
  token: string;

  @Column({ name: 'expira_em' })
  expired_at: Date;

  @CreateDateColumn({ name: 'criado_em' })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { UserToken };
