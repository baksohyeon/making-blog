import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { GetUserResponseDto } from 'src/user/dto/read-board.dto';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<GetUserResponseDto> {
    try {
      const newUser = this.userRepository.create(createUserDto);
      await this.userRepository.save(newUser);
      return newUser as GetUserResponseDto;
    } catch (e) {
      throw e;
    }
  }

  getUserbyId(id: number) {
    try {
      const userSelectedById = this.userRepository.find({
        where: {
          id,
        },
      });
      if (!userSelectedById) {
        throw new NotFoundException(`Corresponding user is not Exists.`);
      }
    } catch (e) {
      if (e.constructor.name !== 'NotFoundException') {
        throw new BadRequestException();
      }
    }
  }

  async getUserbyAuthor(author: string) {
    try {
      const userSelectedById = await this.userRepository.findOne({
        where: {
          author,
        },
      });
      if (!userSelectedById) {
        throw new NotFoundException(`Corresponding user is not Exists.`);
      }
      return userSelectedById;
    } catch (e) {
      if (e.constructor.name !== 'NotFoundException') {
        throw new BadRequestException();
      } else throw e;
    }
  }
}
