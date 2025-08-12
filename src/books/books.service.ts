import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { UUID } from 'node:crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>
  ) { }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const draftBook = {
      // TypeORM will automatically generate the ID if not provided
      // id: crypto.randomUUID(),
      title: createBookDto.title,
      author: createBookDto.author,
      publishedYear: createBookDto.publishedYear,
    };
    const book = this.bookRepository.create(draftBook);
    return this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findOne(id: UUID): Promise<Book | null> {
    return this.bookRepository.findOne({ where: { id } });
  }

  async update(id: UUID, updateBookDto: UpdateBookDto): Promise<boolean> {
    const result = await this.bookRepository.update(id, updateBookDto);
    return Boolean(result.affected);
  }

  async remove(id: UUID): Promise<boolean> {
    const result = await this.bookRepository.delete(id);
    return Boolean(result.affected);
  }
}
