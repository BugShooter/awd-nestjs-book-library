import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { formatSwaggerOutput } from './utils/swaggerFormatter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setOpenAPIVersion('3.0.3')
    .setTitle('Book Library API')
    .setDescription('A simple API to manage a collection of books')
    .setVersion('1.0.0')
    .addServer('http://localhost:3000', 'Local development server')
    .addServer('https://awd-nestjs.onrender.com', 'Production server')
    .build();
  const documentFactory = () => {
    const doc = SwaggerModule.createDocument(app, config);
    return formatSwaggerOutput(doc);
  };
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // convert payloads to instances of DTO classes
      whitelist: true, // remove properties that do not have decorators in DTO
      forbidNonWhitelisted: true, // throw an error if non-whitelisted properties are present
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((reason) => {
  console.error(reason);
  process.exit(1);
});
