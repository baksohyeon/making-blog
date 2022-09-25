import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import DatabaseConfig from './databaseConfig';

@Module({
  imports: [TypeOrmModule.forRoot(DatabaseConfig), BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
