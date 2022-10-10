import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardController } from '../board.controller';
import { BoardService } from '../board.service';
import { Board } from '../entity/board.entity';

const mockBlogRepository = () => ({
  create: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
});

describe('BlogService', () => {
  let blogService: BoardService;
  // let blogController: BlogController;
  let blogRepository: Repository<Board>;

  const BOARD_REPOSITORY_TOKEN = getRepositoryToken(Board);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        {
          provide: BOARD_REPOSITORY_TOKEN,
          useValue: mockBlogRepository(),
        },
      ],
      controllers: [BoardController],
    }).compile();

    blogService = module.get<BoardService>(BoardService);
    blogRepository = module.get<Repository<Board>>(BOARD_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(blogService).toBeDefined();
  });
});
