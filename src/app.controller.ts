import { Controller, Get } from '@nestjs/common';
import { A1Service, AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Qualifer('commentWomenService')
    private readonly commentService: CommentService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
