import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import DatabaseConfig from './databaseConfig';

@Module({
  imports: [TypeOrmModule.forRoot(DatabaseConfig), BlogModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
