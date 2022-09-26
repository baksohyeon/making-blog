import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Board } from './entity/board.entity';

/*
 *  const mockBlogRepository = () => ({
 *    find: jest.fn(),
 *    save: jest.fn(),
 *  });
 */
const boardArray = [new Board(), new Board()];

describe('BlogService', () => {
  let blogService: BlogService;
  // let blogController: BlogController;
  // let blogRepository: Repository<Board>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: getRepositoryToken(Board),
          useValue: {
            find: jest.fn().mockResolvedValue(boardArray),
          },
        },
      ],
      controllers: [BlogController],
    }).compile();

    blogService = module.get<BlogService>(BlogService);
    // blogController = module.get<BlogController>(BlogController);
  });

  it('should be defined', () => {
    expect(blogService).toBeDefined();
  });

  it('should be 4', () => {
    expect(2 + 2).toEqual(4);
  });
});
