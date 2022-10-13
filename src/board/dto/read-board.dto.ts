import { IsNotEmpty } from 'class-validator';

export class GetBoardResponseDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  datedAt: Date;
}
