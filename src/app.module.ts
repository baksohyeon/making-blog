import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';
import DatabaseConfig from './databaseConfig';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(DatabaseConfig), BlogModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
