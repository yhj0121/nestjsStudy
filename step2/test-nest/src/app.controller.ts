import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
//하나의 라우터가 있는 컨트롤러==express 라우터같은 의미
//붙혀서 써야한다
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //router.get하고 같은 의미
  //데코레이터 패턴 함수 클래스에 기능 추가 재사용성 업그레이드
  //  @Get() ===   @Get('/')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
