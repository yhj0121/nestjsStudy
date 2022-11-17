import { CatsModule } from './cats/cats.module';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware';
//catsmodule에서 분리된걸 여기 provider에다가 주입하면
//단일 원칙 책임이 깨진다.
@Module({
  imports: [CatsModule], //임포트 하면 사용가능
  controllers: [AppController], //소비자
  providers: [AppService], //공급자 제거 하면 사용 못함 클래스는 공급자
})
//export하면 provider 등록 안하고 사용 가능

//미들웨어 설정 방법
//NestModule은 configure 인터페이스 의미
//forRouter('cats')는 cat에만 되고 ('*") 일땐 전체에 적용
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
