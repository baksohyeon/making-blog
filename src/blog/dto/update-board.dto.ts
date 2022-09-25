import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  readonly title: string;

  readonly description: string;

  readonly body: string;

  readonly author: string;
}
