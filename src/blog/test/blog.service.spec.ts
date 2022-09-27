import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogController } from '../blog.controller';
import { BlogService } from '../blog.service';
import { Board } from '../entity/board.entity';

const mockBlogRepository = () => ({
  create: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
});

describe('BlogService', () => {
  let blogService: BlogService;
  // let blogController: BlogController;
  let blogRepository: Repository<Board>;

  const BOARD_REPOSITORY_TOKEN = getRepositoryToken(Board);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: BOARD_REPOSITORY_TOKEN,
          useValue: mockBlogRepository(),
        },
      ],
      controllers: [BlogController],
    }).compile();

    blogService = module.get<BlogService>(BlogService);
    blogRepository = module.get<Repository<Board>>(BOARD_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(blogService).toBeDefined();
  });
});
