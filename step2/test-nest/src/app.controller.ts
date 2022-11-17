import { CatsService } from './cats/cats.service';
import { Body, Param, Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
//하나의 라우터가 있는 컨트롤러==express 라우터같은 의미
//붙혀서 써야한다
//controller에도 엔드포인트 사용가능
@Controller()
export class AppController {
  //의존성 주입
  constructor(private readonly appService : AppService, 
    private readonly catsService : CatsService,
    ) {}
  //보통은 this.appservice = appservice로 쓰는데 저건 di(dependency injectjion 형식이라 저런식으로쓴다.)

  //router.get하고 같은 의미
  //데코레이터 패턴 함수 클래스에 기능 추가 재사용성 업그레이드
  //  @Get() ===   @Get('/')
  @Get()
  //여기서 body:dto형식으로 validate가능 이거를 getHello service 부분으로 넘기기도 가능
  getHello(): string {
    return this.catsService.getHello(); //provider
  }
}
