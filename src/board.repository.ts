import { CreateBoardDto } from './blog/dto/create-board.dto';
import { Board } from './blog/entity/board.entity';
import { AppdataSource } from './datasource';

const dataSource = AppdataSource;

export const boardRepository = dataSource.getRepository(Board).extend({
  // content
});
