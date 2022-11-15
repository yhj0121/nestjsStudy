import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController], //소비자
  providers: [AppService], //공급자 제거 하면 사용 못함 클래스는 공급자
})
export class AppModule {}
