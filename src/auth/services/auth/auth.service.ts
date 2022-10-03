import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/services/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateAuthor(authorName: string, pass: string): Promise<any> {
    try {
      const author = await this.userService.getUserbyAuthor(authorName);
      if (author && author.password === pass) {
        const { password, ...result } = author; // password 빼고 나머지 정보를 result에 저장
        return result;
      }
    } catch (e) {
      throw e;
    }
  }
}
