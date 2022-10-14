import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { GetUserResponseDto } from 'src/user/dto/read-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  @UsePipes(new ValidationPipe())
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
