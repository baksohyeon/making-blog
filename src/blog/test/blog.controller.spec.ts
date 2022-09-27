import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BlogController } from '../blog.controller';
import { BlogService } from '../blog.service';
import { CreateBoardDto } from '../dto/create-board.dto';

describe('BlogController', () => {
  let blogController: BlogController;
  let blogService: BlogService;

  const mockBlogService = () => ({
    createBoard: jest
      .fn()
      .mockImplementation((createBoardDto: CreateBoardDto) =>
        Promise.resolve({
          id: 'a uuid',
          dated_at: 'date',
          ...createBoardDto,
        }),
      ),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [
        {
          provide: BlogService,
          useValue: mockBlogService(),
        },
      ],
    }).compile();

    blogService = module.get<BlogService>(BlogService);
    blogController = module.get<BlogController>(BlogController);

    console.log(blogService);
  });

  it('shoud be defined', () => {
    expect(blogController).toBeDefined();
  });

  describe('createBoard', () => {
    it('should be create a new Board', async () => {
      const newCreateBoard: CreateBoardDto = {
        title: 'test',
        description: 'test',
        body: 'test',
        author: 'test',
      };

      await expect(blogController.createBoard(newCreateBoard)).resolves.toEqual(
        {
          id: 'a uuid',
        },
      );
    });
  });
});
