export class GetUserResponseDto {
  id: number;
  username: string;
  password: string;
  email: string;
  bio: string;
  image: string;
}

export class UserResponseWithJwtDto extends GetUserResponseDto {
  token: string;
}
