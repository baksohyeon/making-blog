import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BlogService } from 'src/blog/blog.service';

@Injectable()
export class AuthService {
  constructor(
    private blogService: BlogService,
    private jwtService: JwtService,
  ) {}
}
