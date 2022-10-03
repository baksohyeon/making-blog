import { IsNotEmpty, isNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(16)
  @IsNotEmpty()
  readonly author: string;

  @IsNotEmpty()
  readonly password: string;
}
