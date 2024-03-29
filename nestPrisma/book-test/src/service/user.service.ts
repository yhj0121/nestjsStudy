import { PrismaService, Prisma } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

@Injectable()
export class UserService {
  //로깅하는 법 queryevent라는 걸 불러서 온다
  constructor(private readonly prismaService: PrismaService) {
    prismaService.$on<any>('query', (e: Prisma.QueryEvent) => {
      console.log(e.query);
      console.log(e.params);
      console.log(e.duration);
    });
  }
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
  //unique쓸때 폭합키일 경우에는 이렇게 사용
  async getMyCartList(userId) {
    return await this.prismaService.cart.findUnique({
      where: {
        book_id_user_id: {
          user_id: userId,
        },
      },
      include: {
        book: true,
      },
    });
  }

  async PostMyCartList(datas) {
    return await this.prismaService.cart.create({
      data: {
        datas,
      },
    });
  }

  async postOrder(data) {
    const newOrder = await this.prismaService.order.create({
      data: {
        user_id: data.user_id,
        paymeny_id: faker.datatype.uuid(),
      },
    });

    const { order_id } = await this.PrismaService.order.create({
      data: {
        user_id: data.user_id,
        paymeny_id: faker.datatype.uuid(),
      },
    });
    const datas = data.book_id.split(',').map((book_id) => {});
    const orderInfos = await this.prismaService.orderInfo.createMany({
      data: {
        order_id: order_id,
      },
    });
  }

  async CategoryService(data) {
    return this.prismaService.cart.create({
      data: { data },
    });
  }
  async getCategoryService(data) {
    return this.prismaService.cart.findMany({
      include: {
        book: true,
      },
    });
  }

  //select 같은경우는 queryRaw
  //executeRaw는 영향을 받는 행수 update

  async rawQueryTest() {
    return this.prismaService.$queryRaw(Prisma.sql`SElECT * FROM "BOOK"`);
  }

  // transaction 사용 방법
  //보통은 update 에 많이씀
  async TransactionTest(data) {
    const update1 = await this.prismaService.$transaction([
      this.prismaService.user.update({
        where: {
          user_id: 1,
        },
        data: data,
      }),
    ]);
  }
}
