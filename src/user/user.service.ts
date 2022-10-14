import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { GetUserResponseDto } from 'src/user/dto/read-user.dto';
import { Users } from 'src/user/entity/users.entity';
import { encodePassword } from 'src/utils/bcrypt';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
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

          const newUser = new Users();
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
