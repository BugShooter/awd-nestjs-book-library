import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { UUID } from 'node:crypto';

const bookMap = new Map<UUID, Book>()

@Injectable()
export class BooksService {
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = {
      id: crypto.randomUUID(),
      title: createBookDto.title,
      author: createBookDto.author,
      publishedYear: createBookDto.publishedYear
    }
    bookMap.set(book.id, book)
    return book;
  }

  async findAll(): Promise<Book[]> {
    return [...bookMap.values()];
  }

  async findOne(id: UUID): Promise<Book | null> {
    return bookMap.get(id) ?? null;
  }

  async update(id: UUID, updateBookDto: UpdateBookDto): Promise<boolean> {
    const book = bookMap.get(id);
    if (book === undefined) return false
    const updatedBook = Object.assign(book, updateBookDto);
    bookMap.set(id, updatedBook);
    return true;
  }

  async remove(id: UUID): Promise<boolean> {
    return bookMap.delete(id)
  }
}
