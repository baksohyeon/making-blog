import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Board } from 'src/board/entity/board.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column()
  @Length(2, 16, {
    message: 'The name must be at least 2 but not longer than 16 characters',
  })
  @IsNotEmpty({ message: 'The name is required' })
  username: string;

  @Column()
  @Length(6, 30, {
    message:
      'The password must be at least 6 but not longer than 30 characters',
  })
  @IsNotEmpty({ message: 'The password is required' })
  password: string;

  @IsEmail({ unique: true })
  @Column()
  email: string;

  @Column()
  bio: string;

  @OneToMany(() => Board, (Board) => Board.user)
  boards: Board[];
}
