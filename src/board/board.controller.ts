import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto, CreateBoardResponse } from './dto/create-board.dto';
import { DeleteBoardResponseDto } from './dto/delete-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { GetBoardResponseDto } from './dto/read-board.dto';

@Controller('blog')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // submit a post
  @Post('/post')
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<CreateBoardResponse> {
    try {
      return this.boardService.createBoard(createBoardDto);
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

  @Post('/:id')
  async updateBoard(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<GetBoardResponseDto> {
    return this.boardService.updateBoard(id, updateBoardDto);
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