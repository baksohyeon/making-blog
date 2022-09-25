import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';

export class GetBoardResponseDto {
  id: string;

  title: string;

  description: string;

  body: string;

  author: string;

  dated_at: Date;
}
