import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequest } from 'src/types/express.interface';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user.service';
import { JwtPayload } from '../dto/jwtPayload';
import { instanceToInstance, instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    // check if we have header or not
    if (!req.headers.authorization) {
      req.user = undefined;
      next();
      return;
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decode = jwt.verify(
        token,
        process.env.APP_SECERT as string,
      ) as JwtPayload;
      const user = await this.userService.getUserById(decode.id);
      req.user = user;
      next();
    } catch (e) {
      req.user = undefined;
    }
  }
}
