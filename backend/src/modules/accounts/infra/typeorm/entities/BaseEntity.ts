import { CreateDateColumn, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

export class BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @CreateDateColumn({ default: 'now()' })
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}