import { Test, TestingModule } from '@nestjs/testing';
import { BlogController } from '../blog.controller';
import { BlogService } from '../blog.service';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';

describe('BlogController', () => {
  let blogController: BlogController;
  let blogService: BlogService;

  const mockBlogService = () => ({
    createBoard: jest
      .fn()
      .mockImplementation((createBoardDto: CreateBoardDto) =>
        Promise.resolve({
          id: 'uuid',
          date: 'date',
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
      Promise.resolve([
        {
          title: '1',
          description: '1',
          body: '1',
          author: '1',
        },
      ]),
    ),

    // updateBoard: jest.fn().mockImplementation((id: string, updateBoardDto: UpdateBoardDto) => {
    //   return Promise
    // })

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
    it('should create a new Board', async () => {
      const newCreateBoard: CreateBoardDto = {
        title: 'test',
        description: 'test',
        body: 'test',
        author: 'test',
      };

      await expect(blogController.createBoard(newCreateBoard)).resolves.toEqual(
        { id: 'uuid', date: 'date', ...newCreateBoard },
      );
    });
  });

  describe('getAllboards', () => {
    it('should get an array of boards', async () => {
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

  describe('getBoardsByAuthor', () => {
    it('should return one Board', async () => {
      await expect(
        blogController.getBoardByAuthor('test author'),
      ).resolves.toEqual([
        {
          title: '1',
          description: '1',
          body: '1',
          author: '1',
        },
      ]);
    });

    it('should return same GetBoardResponseDto from blogService', async () => {
      // blogService에서 반환하는 값을 제대로 사용하는지 알기 위해서 스파이 심어둠

      // const blogServiceAuthorSpy = jest.spyOn(blogService, 'getBoardsByAuthor');
      const input = 'test';
      const expectedServiceReturnValue = [
        {
          id: 'uuid',
          dated_at: new Date(),
          title: '1',
          description: '1',
          body: '1',
          author: 'test',
        },
        {
          id: 'uuid',
          dated_at: new Date(),
          title: '2',
          description: '2',
          body: '2',
          author: 'test',
        },
      ];
      const blogServiceSpy = jest
        .spyOn(blogService, 'getBoardsByAuthor')
        .mockResolvedValueOnce(expectedServiceReturnValue);

      const result = await blogController.getBoardByAuthor(input);

      expect(blogServiceSpy).toHaveBeenCalledWith(input);
      expect(result).toEqual(expectedServiceReturnValue);
    });
  });

  describe('updateBoard', () => {
    it('should be updated', async () => )

  });
});
