import { BookCOntroller } from './../controller/book.controller';
import { PrismaController } from '../controller/prisma.controller';
import { PrismaService } from '../service/prisma.service';
import { Module } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';

@Module({
  providers: [BookService],
  imports: [PrismaService],
  exports: [BookService],
  controllers: [BookCOntroller],
})
export class BookModule {}
