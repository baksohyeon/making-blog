import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './board/board.module';
import DatabaseConfig from './databaseConfig';

@Module({
  imports: [TypeOrmModule.forRoot(DatabaseConfig), BoardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
