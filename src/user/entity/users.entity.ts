import { IsEmail, isEmail, IsNotEmpty, Length } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Users {
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

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  @IsEmail({ unique: true })
  @Column()
  email: string;

  @Column({ default: '' })
  bio?: string;

  @Column({ default: '' })
  image: string;
}
