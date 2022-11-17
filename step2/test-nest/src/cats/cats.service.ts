import { Injectable } from '@nestjs/common';

//injectable = provider
@Injectable()
export class CatsService {

  getHello() {
    return 'hello world';
  }
}
