import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
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

  createBoard(creatBoardDto: CreateBoardDto): Promise<Board> {
    try {
      const newBoard = this.boardRepository.create(creatBoardDto);
      return this.boardRepository.save(newBoard);
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
  ): Promise<UpdateResult> {
    try {
      const board = await this.boardRepository.findOne({
        where: {
          id,
        },
      });
      if (board) {
        return this.boardRepository.update(
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
      }
      throw new NotFoundException(
        'Reject update request since it is not available ID',
      );
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
