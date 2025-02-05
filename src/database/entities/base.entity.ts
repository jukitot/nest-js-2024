import { CreateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn()
  created: Date;

  @CreateDateColumn()
  updated: Date;
}
