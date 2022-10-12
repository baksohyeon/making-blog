import { IsOptional } from 'class-validator';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {}
