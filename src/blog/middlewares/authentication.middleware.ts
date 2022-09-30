import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['api-token'] !== 'my-token') {
      throw new BadRequestException('The Token does not match');
    }
    next();
  }
}
