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
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), AuthModule],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
