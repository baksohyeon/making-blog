import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { get } from 'http';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { GetUserResponseDto } from 'src/user/dto/read-board.dto';
import { UserService } from 'src/user/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<GetUserResponseDto> {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  @Get('/author/:author')
  async getUserByauthor(@Param('author') author: string) {
    const user = this.userService.getUserbyAuthor(author);
    return user;
  }
}
