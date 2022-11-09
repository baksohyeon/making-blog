import { User } from '../entity/user.entity';

export type UserType = Omit<User, 'hashPassword' | 'password'>;
