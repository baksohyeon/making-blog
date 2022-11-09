import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { GetUserResponseDto } from './dto/getUserResponse.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import * as jwt from 'jsonwebtoken';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { classToPlain, instanceToPlain } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(data: Partial<User>) {
    try {
      // transaction 사용
      return await this.userRepository.manager.transaction(
        async (transactionManager) => {
          const userByEmail = await this.userRepository.findOne({
            where: {
              email: data.email,
            },
          });
          const userByUsername = await this.userRepository.findOne({
            where: {
              username: data.username,
            },
          });
          if (userByEmail || userByUsername) {
            throw new HttpException(
              'Email or Username are taken',
              HttpStatus.UNPROCESSABLE_ENTITY,
            );
          }

          const newUser = new User(data);
          const user = await this.userRepository.save(newUser);
          return user;
        },
      );
    } catch (e) {
      throw e;
    }
  }

  async generateJwt(user: GetUserResponseDto): Promise<string> {
    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.APP_SECERT as string,
    );
  }

  async buildUserResponse(user: User): Promise<UserResponseInterface> {
    const data = await this.getPlainEntity(user);
    const plainUser = new User(data);
    return {
      userInfo: {
        ...plainUser,
        token: await this.generateJwt(user),
      },
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const userByEmail = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
      select: ['id', 'username', 'email', 'bio', 'image', 'password'],
    });

    if (!userByEmail) {
      throw new HttpException(
        'Credentials are invalid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      loginUserDto.password,
      userByEmail.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Please Check email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const plainUser = instanceToPlain(userByEmail);
    return plainUser as User;
  }

  async getPlainEntity(user: User) {
    return instanceToPlain(user) as User;
  }

  async findOne(where: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOne(where);

    if (!user) {
      throw new NotFoundException(
        `There isn't any user with identifier ${where}`,
      );
    }
    return user;
  }

  async getUserById(userId: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new HttpException(
          'Corresponding user is not exists',
          HttpStatus.NON_AUTHORITATIVE_INFORMATION,
        );
      }
      return user;
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
      return userSelectedByAuthor;
    } catch (e) {
      if (e.constructor.name !== 'NotFoundException') {
        throw new BadRequestException();
      } else throw e;
    }
  }
}
