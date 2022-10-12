import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import DatabaseConfig from './databaseConfig';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig),
    UserModule,
    AuthModule,
  ],
  imports: [TypeOrmModule.forRoot(DatabaseConfig), BoardModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
