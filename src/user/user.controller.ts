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
import { UserService } from 'src/user/user.service';
import { GetUserResponseInterface } from './interface/getUserRespone.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<GetUserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/author/:author')
  async getUserByauthor(@Param('author') author: string) {
    const user = this.userService.getUserbyUsername(author);
    return user;
  }
}
