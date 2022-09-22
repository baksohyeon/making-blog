import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository, UpdateResult } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
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
}
