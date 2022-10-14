import { IsNotEmpty } from 'class-validator';

export class GetUserResponseDto {
  id: number;

  username: string;

  password: string;

  email: string;

  bio: string;

  image: string;
}
