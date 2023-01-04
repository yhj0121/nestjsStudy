import { Controller, Get, Post } from '@nestjs/common';
import { BookService } from 'src/service/book.service';

@Controller()
export class BookCOntroller {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getHello(): string {
    return this.bookService.getHello();
  }
  @Post()
  getPost(): string {
    return this.bookService.getPost();
  }
}
