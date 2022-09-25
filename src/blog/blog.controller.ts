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
import { CreateBoardDto, CreateBoardResponse } from './dto/create-board.dto';
import { DeleteBoardResponseDto } from './dto/delete-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

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

  @Post('/:id')
  async updateBoard(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return await this.boardService.updateBoard(id, updateBoardDto);
  }

  @Delete('/:id')
  async deleteBoard(@Param('id') id: string): Promise<DeleteBoardResponseDto> {
    try {
      const board = await this.boardService.deleteBoard(id);
      return board;
    } catch (e) {
      throw e;
    }
  }
}
