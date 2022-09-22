import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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

  // Read
  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async getBoardsByAuthor(author: string): Promise<Board[] | undefined> {
    try {
      const boards = await this.boardRepository.findOne({
        where: {
          author,
        },
      });
      if (!boards) {
        throw new NotFoundException('There is no such a person.');
      }
      return this.boardRepository
        .createQueryBuilder('board')
        .where('board.author = :author', { author })
        .getMany();
    } catch (e) {
      throw e;
    }
  }
}
