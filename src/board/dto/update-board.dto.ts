import { IsOptional } from 'class-validator';

export class UpdateBoardDto {
  @IsOptional()
  readonly title: string;

  @IsOptional()
  readonly description: string;

  @IsOptional()
  readonly body: string;

  @IsOptional()
  readonly author: string;
}
