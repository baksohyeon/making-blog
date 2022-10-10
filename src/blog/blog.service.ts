import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { DeleteBoardResponseDto } from './dto/delete-board.dto';
import { GetBoardResponseDto } from './dto/read-board.dto';
import { Board } from './entity/board.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async createBoard(creatBoardDto: CreateBoardDto): Promise<Board> {
    try {
      const board = new Board();
      board.author = creatBoardDto.author;
      board.body = creatBoardDto.body;
      board.title = creatBoardDto.title;
      board.description = creatBoardDto.description;
      const newBoard = await this.boardRepository.save(board);
      return newBoard;
    } catch (e) {
      throw e;
    }
  }
  // Read
  async getAllBoards(): Promise<Board[]> {
    try {
      const boards = await this.boardRepository.find();
      return boards;
    } catch (e) {
      if (e.constructor.name === 'NotFoundException') {
        throw e;
      }
      throw new InternalServerErrorException(e);
    }
  }

  async getBoardsByAuthor(author: string): Promise<GetBoardResponseDto[]> {
    try {
      const boards = await this.boardRepository.find({
        where: {
          author,
        },
      });
      return boards.map((board) => board as GetBoardResponseDto);
    } catch (e) {
      if (e.constructor.name === 'NotFoundException') {
        throw e;
      }
      throw new InternalServerErrorException(e);
    }
  }

  async updateBoard(
    id: string,
    updateBoardDto: UpdateBoardDto,
  ): Promise<GetBoardResponseDto> {
    try {
      const board = await this.boardRepository.findOne({
        where: {
          id,
        },
      });
      if (board) {
        return await this.boardRepository.manager.transaction(
          async (manager) => {
            await manager.update(
              Board,
              {
                id,
              },
              {
                title: updateBoardDto.title,
                author: updateBoardDto.author,
                body: updateBoardDto.body,
                description: updateBoardDto.description,
              },
            );
            const updatedBoard = await manager.findOne(Board, {
              where: {
                id,
              },
            });

            if (!updatedBoard) {
              throw new BadRequestException('hello');
            }
            return updatedBoard as GetBoardResponseDto;
          },
        );
      } else {
        throw new NotFoundException(
          'Reject update request since Corresponding ID is not existed',
        );
      }
    } catch (e) {
      throw e;
    }
  }

  async deleteBoard(id: string): Promise<DeleteBoardResponseDto> {
    try {
      const droppedBoard = await this.boardRepository.findOne({
        where: {
          id,
        },
      });
      if (!droppedBoard) {
        throw new NotFoundException('Corresponding ID is not found');
      } else {
        this.boardRepository.delete(id);
        return droppedBoard as DeleteBoardResponseDto;
      }
    } catch (e) {
      if (e.constructor.name === 'NotFoundException') {
        throw e;
      }
      throw new InternalServerErrorException(e);
    }
  }
}
