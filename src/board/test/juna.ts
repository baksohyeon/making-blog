import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { Repository } from 'typeorm';
import { BoardController } from '../board.controller';
import { BoardService } from '../board.service';
import { Board } from '../entity/board.entity';

describe('BlogController', () => {
  it('unit test', async () => {
    const testId = 'test-id';
    const boardRepositoryTest = {
      save: jest.fn().mockResolvedValue(
        Promise.resolve({
          id: testId,
        } as Board),
      ),
    } as unknown as Repository<Board>;
    const blogServiceTest = new BoardService(boardRepositoryTest);
    const blogControllerTest = new BoardController(blogServiceTest);

    const controllerResult = await blogControllerTest.createBoard({
      title: 'hello',
      description: 'hello2',
      body: 'hello3',
      author: 'hello4',
    });

    expect(boardRepositoryTest.save).toBeCalled();
    expect(controllerResult.id).toBe(testId);
  });

  it('integration test', async () => {
    // 진짜로 nest를 띄움
  });
});
