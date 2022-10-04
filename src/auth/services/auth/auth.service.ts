import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user/user.service';

// 대부분 검증작업은 여기에서 진행됨

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // validateUser: LocalStrategy에서 호출한다. username/password 로그인 유효성을 login 호출 이전에 체크한다.
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

  // login: validate user인 경우 사용자 정보를 통한 webtoken 생성
  async login(user: any) {
    const payload = { authorName: user.author, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
