import { IsNotEmpty, IsString } from 'class-validator';

export class GetTagResponseDto {
  @IsNotEmpty()
  tagId: number;

  @IsNotEmpty()
  @IsString()
  tagName: string;
}
