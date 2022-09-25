import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto {
  readonly title: string;

  readonly description: string;

  readonly body: string;

  readonly author: string;
}
