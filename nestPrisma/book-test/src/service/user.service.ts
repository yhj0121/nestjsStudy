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
}
