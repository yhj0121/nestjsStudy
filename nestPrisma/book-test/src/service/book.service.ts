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
    const data = new Array(10000).fill().map(() => ({
      title: faker.lorem.lines(),
      pushlisher: faker.company.bs(),
      author: faker.internet.userName(),
      price: Math.ceil(Math.random() * 1000),
    }));
    return this.prismaService.book.createMany({
      data,
    });
  }
}
