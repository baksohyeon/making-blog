import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';
import DatabaseConfig from './databaseConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig),
    UserModule,
    AuthModule,
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
