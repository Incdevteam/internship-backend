import { NestFactory } from '@nestjs/core';
import { PlatformModule } from './platform.module';
import { HttpExceptionFilter } from '../../../libs/core/exception-handlers/http-exception.filter';
import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { useContainer } from 'class-validator';
// import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(PlatformModule);
  useContainer(app.select(PlatformModule), { fallbackOnErrors: true });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const errorsForResponse = [];
        errors.forEach((e) => {
          const constraintsKeys = Object.keys(e.constraints);
          constraintsKeys.forEach((cKey) => {
            errorsForResponse.push({
              message: e.constraints[cKey],
              field: e.property,
            });
          });
        });
        throw new BadRequestException(errorsForResponse);
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  //  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
