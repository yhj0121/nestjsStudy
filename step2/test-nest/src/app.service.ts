import { Injectable } from '@nestjs/common';

//비지니스 로직 res.send안하고 return으로 보내면됨
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
