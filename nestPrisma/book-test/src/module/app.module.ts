import { Global, Module, CacheModule } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { PrismaController } from '../controller/prisma.controller';
import { PrismaService } from '../service/prisma.service';
import { PrismaModule } from './prisma.module';
import * as redisStore from 'cache-manager';
@Global()
@Module({
  imports: [
    PrismaModule,
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, PrismaController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
