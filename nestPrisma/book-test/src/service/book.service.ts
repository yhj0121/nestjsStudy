import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { faker } from '@faker-js/faker';
@Injectable()
export class BookService {
  constructor(private readonly prismaService: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }

  getPost(): string {
    return this.prismaService.book.create({});
  }
}
