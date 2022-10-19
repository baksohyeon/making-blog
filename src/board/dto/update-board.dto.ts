import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateBoardDto } from './create-board.dto';

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
