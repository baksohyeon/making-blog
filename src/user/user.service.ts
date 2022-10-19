import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entity/user.entity';
import { encodePassword } from 'src/utils/bcrypt';
import { getConnection, Repository } from 'typeorm';
import { GetUserResponseDto } from './dto/getUserResponse.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<GetUserResponseDto> {
    try {
      // transaction 사용
      return await this.userRepository.manager.transaction(
        async (transactionManager) => {
          const userByEmail = await this.userRepository.findOne({
            where: {
              email: createUserDto.email,
            },
          });
          const userByUsername = await this.userRepository.findOne({
            where: {
              username: createUserDto.username,
            },
          });
          if (userByEmail || userByUsername) {
            throw new HttpException(
              'Email or Username are taken',
              HttpStatus.UNPROCESSABLE_ENTITY,
            );
          }

          const newUser = new User();
          Object.assign(newUser, createUserDto);
          return (await this.userRepository.save(
            newUser,
          )) as GetUserResponseDto;
        },
      );
    } catch (e) {
      throw e;
    }
  }

  async getUserbyUsername(username: string): Promise<GetUserResponseDto> {
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
