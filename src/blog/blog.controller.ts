import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBoardDto, CreateBoardResponse } from './dto/create-Board.dto';
import { Board } from './entity/board.entity';

@Controller('blog')
export class BlogController {
  constructor(private readonly boardService: BlogService) {}

  // submit a post
  @Post('/post')
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<CreateBoardResponse> {
    try {
      const newBoard = await this.boardService.createBoard(createBoardDto);
      return {
        id: newBoard.id,
      };
    } catch (e: any) {
      switch (e.constructor.name) {
        case 'QueryFailedError':
          throw new BadRequestException(
            e.constructor.name,
            'not enough paramters',
          );
        default:
          throw new InternalServerErrorException(
            e.constructor.name,
            'Server error occured',
          );
      }
    }
  }

  @Delete('/:id')
  async deleteBoard(@Param('id') id: string): Promise<void> {
    this.boardService.deleteBoard(id);
  }
}
