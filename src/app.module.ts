import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';
import DatabaseConfig from './databaseConfig';
import { DataSource } from 'typeorm';
import { AuthMiddleware } from './user/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(DatabaseConfig), UserModule, BoardModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
