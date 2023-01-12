import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFaker(payload) {
    return await this.prismaService.user.findMany({
      take: 12,
      skip: 12 * payload,
      orderBy: {
        user_id: 'desc',
      },
      //select하면 중복되는 user_Id 안옴
      select: {
        user_id: true,
        email: true,
      },
    });
  }
  async createFakeUser() {
    // return await this.prismaService.user.createMany({

    // });
    const array = await Promise.all(
      new Array(1000).fill(
        this.prismaService.user.create({
          data: {
            email: faker.internet.email(),
            userInfo: {
              create: {
                password: payload.password,
              },
            },
          },
        }),
      ),
    );
    return array.length;
  }

  async users(payload) {
    return await this.prismaService.user.create({
      data: {
        email: payload.email,
        name: payload.name,
        userInfo: {
          create: {
            password: payload.password,
          },
        },
      },
      include: {
        userInfo: true,
      },
    });
  }
  async getBookservice(payload) {
    return await this.prismaService.review.findMany({
      where: {
        book_id: payload,
      },
      include: {
        user: true,
      },
    });
  }

  async postBookService(payload, book_id) {
    return await this.prismaService.review.create({
      data: {
        user_id: Number(book_id),
        book_id,
        content: payload.content,
        rating: Number(payload.rating) > 5 ? 5 : Number(payload.rating),
      },
    });
  }

  async deleteUser(userId) {
    return await this.prismaService.user.delete({
      where: {
        user_id: userId,
      },
    });
  }

  async getBookList(bookId) {
    return await this.prismaService.book.findMany({
      where: {
        book_id: bookId,
      },
    });
  }

  async getBookName(name) {
    return await this.prismaService.book.findMany({
      where: {
        title: {
          contains: name, //단어가 포함이 된 title만 가져옴
        },
      },
    });
  }

  async getBookName2(name) {
    return await this.prismaService.book.findMany({
      where: {
        title: {
          search: name, //search를 사용하면 and or not같은거 사용가능
          //네이버|naver
        },
      },
    });
  }
}
