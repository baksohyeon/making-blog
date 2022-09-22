import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-Board.dto';
import { Board } from './entity/board.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async getAllBoard(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  createBoard(creatBoardDto: CreateBoardDto): Promise<Board> {
    try {
      const newBoard = this.boardRepository.create(creatBoardDto);
      return this.boardRepository.save(newBoard);
    } catch (e) {
      throw e;
    }
  }

  async deleteBoard(id: string): Promise<void> {
    try {
      const droppedBoard = await this.boardRepository.findOne({
        where: {
          id,
        },
      });
      if (!droppedBoard) {
        this.boardRepository.delete(id);
      }
      throw new NotFoundException('Corresponding ID is not found');
    } catch (e) {
      throw e;
    }
  }
}
