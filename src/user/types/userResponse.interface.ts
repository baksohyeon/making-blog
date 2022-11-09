import { User } from '../entity/user.entity';
import { UserType } from './user.type';

export interface UserResponseInterface {
  userInfo: {
    token: string;
    id: number;
    username: string;
    email: string;
    bio: string;
    image: string;
  };
}
