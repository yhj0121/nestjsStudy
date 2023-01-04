import { Global, Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { PrismaController } from '../controller/prisma.controller';
import { PrismaService } from '../service/prisma.service';
import { PrismaModule } from './prisma.module';
@Global()
@Module({
  imports: [PrismaModule],
  controllers: [AppController, PrismaController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
