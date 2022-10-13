import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { GetUserResponseDto } from 'src/user/dto/read-user.dto';
import { Users } from 'src/user/entity/users.entity';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<GetUserResponseDto> {
    try {
      const hashedPassword = await encodePassword(createUserDto.password);
      const user = new Users();
      user.username = createUserDto.username;
      user.password = hashedPassword;

      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);
      return newUser as GetUserResponseDto;
    } catch (e) {
      throw e;
    }
  }

  async getUserbyAuthor(username: string): Promise<GetUserResponseDto> {
    try {
      const userSelectedByAuthor = await this.userRepository.findOne({
        where: {
          username: username,
        },
      });
      if (!userSelectedByAuthor) {
        throw new NotFoundException(`Corresponding user is not Exists.`);
      }
      return userSelectedByAuthor as GetUserResponseDto;
    } catch (e) {
      if (e.constructor.name !== 'NotFoundException') {
        throw new BadRequestException();
      } else throw e;
    }
  }
}
