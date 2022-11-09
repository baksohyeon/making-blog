import { IsEmail, isEmail, IsNotEmpty, Length } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Entity({ name: 'user' })
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
  @Exclude()
  @Length(6, 30, {
    message:
      'The password must be at least 6 but not longer than 30 characters',
  })
  @IsNotEmpty({ message: 'The password is required' })
  password: string;

  @IsEmail({ unique: true })
  @Column()
  email: string;

  @Column({ default: '' })
  bio: string;

  @Column()
  image: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  // async checkPassword(plainPassword: string): Promise<Boolean> {
  //   return await bcrypt.compare(plainPassword, this.password);
  // }

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
