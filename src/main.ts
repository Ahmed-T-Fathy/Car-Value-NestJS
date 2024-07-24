import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // app.use(
  //   cookieSession({
  //     keys: ['asdfasfd'],
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: {
  //       maxAge: 3,
  //       expires : true,
  //       httpOnly: true 
  //     },
  //   }),
  // );

  await app.listen(3000);
}
bootstrap();
