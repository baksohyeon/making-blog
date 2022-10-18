export interface GetUserResponseInterface {
  id: number;
  username: string;
  password: string;
  email: string;
  bio: string;
  image: string;
}

export interface UserResponseWithJwtInterface extends GetUserResponseInterface {
  token: string;
}
