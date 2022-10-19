import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entity/board.entity';
import { GetBoardResponseInterface } from './interface/get-board-response.interface';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async createBoard(creatBoardDto: CreateBoardDto) {
    try {
      const board = new Board();
      Object.assign(board, creatBoardDto);
      if (!board.tagList) {
        board.tagList = [];
      }
      board.slug = 'foo';
      return await this.boardRepository.save(board);
    } catch (e) {
      throw e;
    }
  }
  // Read

  async getAllBoards(): Promise<GetBoardResponseInterface[]> {
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

  async getBoardsByUsername(
    username: string,
  ): Promise<GetBoardResponseInterface[]> {
    try {
      const boards = await this.boardRepository.find({
        where: { username },
      });
      return boards.map((board) => board as GetBoardResponseInterface);
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
  ): Promise<GetBoardResponseInterface> {
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
            Object.assign(newBoard, updateBoardDto);
            const savedBoard = await manager.save(board);

            return savedBoard as GetBoardResponseInterface;
          },
        );
      }
    } catch (e) {
      throw e;
    }
  }

  async deleteBoard(id: string): Promise<GetBoardResponseInterface> {
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
        return droppedBoard as GetBoardResponseInterface;
      }
    } catch (e) {
      if (e.constructor.name === 'NotFoundException') {
        throw e;
      }
      throw new InternalServerErrorException(e);
    }
  }
}
