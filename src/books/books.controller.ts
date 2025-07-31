import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, NotFoundException, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ResponseBookDto } from './dto/response-book.dto';
import { plainToClass } from '@nestjs/class-transformer';
import { UUID } from 'node:crypto';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiAcceptedResponse,
} from '@nestjs/swagger';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'List all books' })
  @ApiOkResponse({
    description: 'A list of books',
    type: ResponseBookDto,
    isArray: true,
  })
  async findAll(): Promise<ResponseBookDto[]> {
    const books = await this.booksService.findAll();
    return plainToClass(ResponseBookDto, books);
  }

  @Post()
  @ApiOperation({ summary: 'Add a new book' })
  @ApiCreatedResponse({
    description: 'Book created successfully',
    type: ResponseBookDto,
  })
  async create(@Body() createBookDto: CreateBookDto): Promise<ResponseBookDto> {
    const createdBook = await this.booksService.create(createBookDto);
    return plainToClass(ResponseBookDto, createdBook);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiOkResponse({
    description: 'A single book',
    type: ResponseBookDto,
  })
  @ApiNotFoundResponse({ description: 'Book not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: UUID): Promise<ResponseBookDto> {
    const book = await this.booksService.findOne(id);
    if (!book) throw new NotFoundException('Book not found');
    return plainToClass(ResponseBookDto, book);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiOkResponse({
    description: 'Book updated successfully',
    type: ResponseBookDto,
  })
  @ApiNotFoundResponse({ description: 'Book not found' })
  async update(@Param('id', ParseUUIDPipe) id: UUID, @Body() updateBookDto: UpdateBookDto): Promise<ResponseBookDto> {
    const success = await this.booksService.update(id, updateBookDto);
    if (!success) {
      throw new NotFoundException('Book not found');
    }
    const book = await this.booksService.findOne(id);
    return plainToClass(ResponseBookDto, book);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiAcceptedResponse({ description: 'Book deleted successfully' })
  @ApiNotFoundResponse({ description: 'Book not found' })
  async remove(@Param('id', ParseUUIDPipe) id: UUID): Promise<void> {
    const success = await this.booksService.remove(id);
    if (!success) {
      throw new NotFoundException('Book not found');
    }
  }
}
