import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { TagsModule } from './tags/tags.module';
import DatabaseConfig from './databaseConfig';

@Module({
  imports: [TypeOrmModule.forRoot(DatabaseConfig), BoardModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
