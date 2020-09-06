import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './Book';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks(@Query('author') author: string): Book[] {
    if (author) {
      return this.bookService.getBooksOf(author);
    }
    return this.bookService.getAllBooks();
  }

  @Post()
  createBook(@Body() newBook: Book): Book {
    this.bookService.addBook(newBook);

    return this.bookService.getBook(newBook.title);
  }

  @Get('/:title')
  getBook(@Param('title') title): Book {
    return this.bookService.getBook(title);
  }

  @Delete('/:title')
  deleteBook(@Param('title') title): void {
    this.bookService.deleteBook(title);
  }
}
