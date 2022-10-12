import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'author' });
  }

  async validate(author: string, password: string): Promise<any> {
    const selectedAuthor = await this.authService.validateAuthor(
      author,
      password,
    );
    if (!selectedAuthor) {
      throw new UnauthorizedException();
    }
    return selectedAuthor;
  }
}
