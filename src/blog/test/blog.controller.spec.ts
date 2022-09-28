import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogController } from '../blog.controller';
import { BlogService } from '../blog.service';
import { CreateBoardDto } from '../dto/create-board.dto';
import { Board } from '../entity/board.entity';

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

    getAllBoards: jest.fn().mockResolvedValue([
      {
        title: '1',
        description: '1',
        body: '1',
        author: '1',
      },
      {
        title: '2',
        description: '2',
        body: '2',
        author: '2',
      },
      {
        title: '3',
        description: '3',
        body: '3',
        author: '3',
      },
    ]),

    getBoardsByAuthor: jest.fn().mockImplementation((author: string) =>
      Promise.resolve({
        title: '1',
        description: '1',
        body: '1',
        author: '1',
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

  describe('getAllboards', () => {
    it('should be get an array of boards', async () => {
      await expect(blogController.getAllBoards()).resolves.toEqual([
        {
          title: '1',
          description: '1',
          body: '1',
          author: '1',
        },
        {
          title: '2',
          description: '2',
          body: '2',
          author: '2',
        },
        {
          title: '3',
          description: '3',
          body: '3',
          author: '3',
        },
      ]);
    });
  });
});
