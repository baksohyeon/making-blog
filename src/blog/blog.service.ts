import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDTO } from './dto/create-Board.dto';
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

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }
}
