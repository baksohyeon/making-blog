import { Test, TestingModule } from '@nestjs/testing';
import { stringify } from 'querystring';
import { UpdateResult } from 'typeorm';
import { BoardController } from '../board.controller';
import { BoardService } from '../board.service';
import { CreateBoardDto } from '../dto/create-board.dto';
import { GetBoardResponseDto } from '../dto/read-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';

describe('BlogController', () => {
  let blogController: BoardController;
  let blogService: BoardService;

  // TODO: 서비스 로직 모킹
  const mockBlogService = () => ({
    createBoard: jest
      .fn()
      .mockImplementation((createBoardDto: CreateBoardDto) =>
        Promise.resolve({
          id: 'uuid',
          date: 'date',
          title: 'title',
          description: 'description',
          body: 'body',
          author: 'author',
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
          id: 'uuid',
          date: 'date',
          title: 'title',
          description: 'description',
          body: 'body',
          author: 'author',
        },
        {
          id: 'uuid2',
          date: 'date2',
          title: 'title2',
          description: 'description2',
          body: 'body2',
          author: 'author2',
        },
      ]),
    ),

    updateBoard: jest
      .fn()
      .mockResolvedValue((id: string, updateBoardDto: UpdateBoardDto) =>
        Promise.resolve({
          id: 'uuid',
          date: 'date',
          title: 'title',
          description: 'description',
          body: 'body',
          author: 'author',
        }),
      ),
  });

  // TODO: 모듈 설정
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardController],
      providers: [
        {
          provide: BoardService,
          useValue: mockBlogService(),
        },
      ],
    }).compile();

    blogService = module.get<BoardService>(BoardService);
    blogController = module.get<BoardController>(BoardController);
  });

  // TODO: 테스트 코드 짜기
  it('shoud be defined', () => {
    expect(blogController).toBeDefined();
  });

  it('should be defined', () => {
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
        {
          id: 'uuid',
          date: 'date',
          title: 'title',
          description: 'description',
          body: 'body',
          author: 'author',
        },
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
    it('should return Boards', async () => {
      await expect(
        blogController.getBoardByAuthor('test author'),
      ).resolves.toEqual([
        {
          id: 'uuid',
          date: 'date',
          title: 'title',
          description: 'description',
          body: 'body',
          author: 'author',
        },
        {
          id: 'uuid2',
          date: 'date2',
          title: 'title2',
          description: 'description2',
          body: 'body2',
          author: 'author2',
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

  // describe('updateBoard', () => {
  //   it('should be updated', async () => {
  //     const updateDto: UpdateBoardDto = {
  //       title: 'title',
  //       description: 'description',
  //       body: 'body',
  //       author: 'author',
  //     };

  //     await expect(
  //       blogController.updateBoard('id', updateDto),
  //     ).resolves.toEqual({
  //       id: 'uuid',
  //       date: 'date',
  //       title: 'title',
  //       description: 'description',
  //       body: 'body',
  //       author: 'author',
  //     });
  //   });
  // });
});
