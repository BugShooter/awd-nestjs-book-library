import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Book Library API')
    .setDescription('A simple API to manage a collection of books')
    .setVersion('1.0.0')
    .addTag('books')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({
    transform: true, // convert payloads to instances of DTO classes
    whitelist: true, // remove properties that do not have decorators in DTO
    forbidNonWhitelisted: true, // throw an error if non-whitelisted properties are present
  }))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((reason) => {
  console.error(reason);
  process.exit(1);
});
