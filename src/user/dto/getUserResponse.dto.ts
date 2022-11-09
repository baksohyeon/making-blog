export class GetUserResponseDto {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly bio: string;
  readonly image: string;
}

export class GetUserResponseWithJwtDto extends GetUserResponseDto {
  readonly token: string;
}
