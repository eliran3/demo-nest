import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // means that only the fields specified in the dto are going to be passed
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
<<<<<<< HEAD

=======
>>>>>>> 982bbac55fd3e7d6730617ace16041c5aebba569
