import { PrismaController } from '../controller/prisma.controller';
import { PrismaService } from '../service/prisma.service';
import { Module, Controller } from '@nestjs/common';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  controllers: [PrismaController],
})
export class PrismaModule {}
