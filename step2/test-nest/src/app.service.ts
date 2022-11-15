import { Injectable } from '@nestjs/common';

//비지니스 로직 res.send안하고 return으로 보내면됨
@Injectable()
export class AppService {
  //유지보수 가독성 디자인패턴을 위해 모듈단위로 나눈다.
  getHello(): string {
    return 'Hello World!';
  }
}
