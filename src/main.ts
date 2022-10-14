import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { appendFile } from 'fs';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3001'],
    credentials: true,
  });
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //   }),
  // );
  await app.listen(3000);
}
bootstrap();
