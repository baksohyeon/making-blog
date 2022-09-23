import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateBoardDTO } from './dto/create-Board.dto';
import { GetBoardResponseDto } from './dto/read-board.dto';
import { Board } from './entity/board.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  createBoard(creatBoardDto: CreateBoardDTO): Promise<Board> {
    try {
      const newBoard = this.boardRepository.create(creatBoardDto);
      return this.boardRepository.save(newBoard);
    } catch (e) {
      throw e;
    }
  }

  // Read
  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
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
      throw e;
    }
  }
}
