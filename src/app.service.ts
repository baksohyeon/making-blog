import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}


@Injectable()
export interface CommentService {
  save(): void
}

export class CommentWomenService implements CommentService {
  save() {
    commentWomen.save()
  }
}

export class CommentManService implements CommentService {
  save() {
    commentMan.save()
  }
}
