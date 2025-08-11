import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: true,
      // ssl: false, // For local docker pg
      // ssl: {
      //   rejectUnauthorized: false, // This is important for self-signed certificates
      // },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
    }),
    BooksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
