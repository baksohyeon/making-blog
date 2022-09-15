import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryColumn({ type: 'binary', length: 16 })
  id!: Buffer;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  body: string;

  @Column()
  author: string;

  @CreateDateColumn({ type: 'timestamp' })
  date_posted: Date;
}
