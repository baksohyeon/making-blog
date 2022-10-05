import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { get } from 'http';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
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

  @UseGuards(JwtAuthGuard)
  @Get('/author/:author')
  async getUserByauthor(@Param('author') author: string) {
    const user = this.userService.getUserbyAuthor(author);
    return user;
  }
}
