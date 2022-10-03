import * as path from 'path';
import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const env = process.env.NODE_ENV || 'dev';
const dotenv_path = path.resolve(process.cwd(), `./${env}.env`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) {
  /* do nothing */
}

export const DatabaseConfig = {
  type: 'mysql',
  // driver: 'mysql',
  database: process.env.DATABASE_NAME || 'blog',
  port: parseInt(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  synchronize: true,
  migrationsRun: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  cli: { migrationsDir: 'src/migrations' },
  namingStrategy: new SnakeNamingStrategy(),
} as TypeOrmModuleOptions;

export default DatabaseConfig;
