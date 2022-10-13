import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Tags {
  @PrimaryGeneratedColumn()
  tag_id: number;

  @Column()
  tag_name: string;
}
