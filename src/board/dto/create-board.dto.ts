import { IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly body: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsArray()
  tagList: string[];

  slug?: string;
}
