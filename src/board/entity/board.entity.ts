import {
  Binary,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryColumn({ type: 'binary' })
  @Generated('uuid')
  id: string;

  @Column({ default: '' })
  slug: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: '' })
  body: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'simple-array' })
  tagList: string[];

  @Column({ default: 0 })
  favoritesCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
