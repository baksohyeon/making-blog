import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './board/board.module';
import { TagsModule } from './tags/tags.module';
import DatabaseConfig from './databaseConfig';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [TypeOrmModule.forRoot(DatabaseConfig), BoardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
