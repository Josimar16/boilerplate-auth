import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
// import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidV4 } from 'uuid';

@Entity({ name: 'usuario', schema: 'auth' })
class User {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ name: 'nome' })
  name: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'senha', select: false })
  password?: string;

  @CreateDateColumn({ name: 'criado_em' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  updatedAt: Date;

  @VersionColumn({ name: 'versao' })
  version: number;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
