import {
  Binary,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryColumn({ type: 'binary' })
  @Generated('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  body: string;

  @Column()
  author: string;

  // @CreateDateColumn({ type: 'timestamp' })
  // date_posted: Date;

  @Column({
    name: 'dated_At',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  datedAt?: Date;
}
