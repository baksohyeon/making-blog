import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entity/user.entity';
import { UserResponseInterface } from './types/userResponse.interface';
import { ExpressRequest } from 'src/types/express.interface';
import { UserDecorator } from './decorator/user.decorator';
import { AuthGuard } from './guards/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginUserDto): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('/author/:author')
  async getUserByauthor(@Param('author') author: string) {
    const user = this.userService.getUserbyUsername(author);
    return user;
  }

  @Get()
  @UseGuards(AuthGuard)
  async currentUser(
    @UserDecorator() user: User,
  ): Promise<UserResponseInterface> {
    // 미들웨어에서 토큰에서 유저 추출
    // 가드에서 유저가 있으면 true 반환
    return this.userService.buildUserResponse(user);
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @UserDecorator('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(userId, updateUserDto);
    return user;
  }
}
