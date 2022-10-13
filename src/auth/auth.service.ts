import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { comparePasswords } from 'src/utils/bcrypt';

// 대부분 검증작업은 여기에서 진행됨

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // validateUser: LocalStrategy에서 호출한다. username/password 로그인 유효성을 login 호출 이전에 체크한다.
  async validateAuthor(authorName: string, password: string) {
    const authorInfo = await this.userService.getUserbyAuthor(authorName);
    if (authorInfo) {
      // 찾는 author에 해당하는 값이 있을 경우
      console.log(password, authorInfo.password);
      const matched = comparePasswords(password, authorInfo.password); // dto에 넣은 raw 비번이랑 db에서 가져온 해쉬된 비번이랑 비교
      if (matched) {
        const { password, ...result } = authorInfo; // password 빼고 나머지 정보를 result에 저장
        return result;
      }
    }
    return null;
  }

  // login: validate user인 경우 사용자 정보를 통한 webtoken 생성
  async login(user: { id: number; author: string }) {
    const payload = { author: user.author, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
