import { Request } from 'express';
import { User } from 'src/user/entity/user.entity';

export interface ExpressRequest extends Request {
  user?: User;
}
