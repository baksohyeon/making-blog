import {
  MiddlewareConsumer,
  Module,
  NestModule,
  Req,
  RequestMethod,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entity/board.entity';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(BlogController);
  }
}
