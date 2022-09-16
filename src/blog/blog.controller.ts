import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBoardDTO } from './dto/create-Board.dto';
import { Board } from './entity/board.entity';

@Controller('blog')
export class BlogController {
  constructor(private readonly boardService: BlogService) {}

  // submit a post
  @Post('/post')
  async createBoard(@Res() res, @Body() createBoardDto: CreateBoardDTO) {
    const newBoard = await this.boardService.createBoard(createBoardDto);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been submitted successfully!',
    });
  }
}
