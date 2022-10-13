import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { GetBoardResponseDto } from './dto/read-board.dto';
import { Board } from './entity/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async createBoard(creatBoardDto: CreateBoardDto): Promise<Board> {
    try {
      const board = new Board();
      board.title = creatBoardDto.title;
      board.description = creatBoardDto.description;
      board.body = creatBoardDto.body;
      board.username = creatBoardDto.username;
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
          username: author,
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

      if (!board) {
        throw new NotFoundException(
          'Reject update request since Corresponding ID is not existed',
        );
      } else {
        return await this.boardRepository.manager.transaction(
          async (manager) => {
            let newBoard = new Board();
            newBoard.title = updateBoardDto.title || board.title;
            newBoard.username = updateBoardDto.username || board.username;
            newBoard.body = updateBoardDto.body || board.body;
            newBoard.description =
              updateBoardDto.description || board.description;

            const savedBoard = await manager.save(board);

            return savedBoard as GetBoardResponseDto;
          },
        );
      }
    } catch (e) {
      throw e;
    }
  }

  async deleteBoard(id: string): Promise<GetBoardResponseDto> {
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
        return droppedBoard as GetBoardResponseDto;
      }
    } catch (e) {
      if (e.constructor.name === 'NotFoundException') {
        throw e;
      }
      throw new InternalServerErrorException(e);
    }
  }
}
