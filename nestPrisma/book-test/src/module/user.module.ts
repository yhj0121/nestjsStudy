import { PrismaController } from '../controller/prisma.controller';
import { PrismaService } from '../service/prisma.service';
import { Module } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';

@Module({
  providers: [UserService],
  imports: [PrismaService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
