import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Creates an instance of NestJS application using the main application module.
  const app = await NestFactory.create(AppModule);
  // Sets a global prefix for all the routes in the application. All routes will have '/api' before their specific route.
  app.setGlobalPrefix('api');
  // Uses a global pipe to validate all incoming requests.
  // The ValidationPipe is used to validate and transform the input data to the desired format.
  app.useGlobalPipes(
    new ValidationPipe({
      // If 'whitelist' is true, properties that do not have any validation decorators will be stripped from the resulting object.
      whitelist: true,
      // If 'forbidNonWhitelisted' is true, it will throw an error when non-whitelisted properties are found on the validation object.
      forbidNonWhitelisted: true,
      // If 'transform' is true, it will transform the types of the input values to the types of the validation class object properties.
      transform: true,
      // 'enableImplicitConversion' allows for implicit conversion of types. For example, it will convert a string to a number if the validation class property type is a number.
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
