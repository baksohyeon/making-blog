import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBoardDTO, CreateBoardResponse } from './dto/create-Board.dto';
import { GetBoardResponseDto } from './dto/read-board.dto';
import { Board } from './entity/board.entity';

@Controller('blog')
export class BlogController {
  constructor(private readonly boardService: BlogService) {}

  // submit a post
  @Post('/post')
  async createBoard(
    @Body() createBoardDto: CreateBoardDTO,
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

  @Get('/all')
  async getAllBoards(): Promise<GetBoardResponseDto[]> {
    try {
      const allBoards = (await this.boardService.getAllBoards()).map(
        (board) => board as GetBoardResponseDto,
      );
      return allBoards;
    } catch (e) {
      throw e;
    }
  }

  @Get('/author/:author')
  async getBoardByAuthor(
    @Param('author') author: string,
  ): Promise<GetBoardResponseDto[]> {
    return this.boardService.getBoardsByAuthor(author);
  }
}
