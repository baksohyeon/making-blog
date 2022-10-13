import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  tagId: number;

  @Column()
  tagName: string;
}
