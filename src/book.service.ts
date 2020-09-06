import { Injectable } from '@nestjs/common';
import { Book } from './Book';

@Injectable()
export class BookService {
  private readonly storage: Map<string, Book> = new Map();

  addBook(book: Book): void {
    this.storage.set(book.title, book);
  }

  getBook(name: string): Book | undefined {
    return this.storage.get(name);
  }

  deleteBook(name: string): boolean {
    return this.storage.delete(name);
  }

  getBooksOf(author: string): Book[] {
    return Array.from(this.storage.values()).filter(
      book => book.author === author,
    );
  }

  getAllBooks() {
    return Array.from(this.storage.values()).sort((bookA, bookB) =>
      bookA.title.localeCompare(bookB.title),
    );
  }

  getTotalNumberOfBooks() {
    return this.storage.size;
  }
}
