import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
//실시간 데이터 처리 예전 페이지 폴링
//크롬은 웹소켓

//여기서 네임 스페이스 설정 가능
@WebSocketGateway({ namespace: 'controller' })
export class ChatGateway implements OnGatewayInit {
  private logger = new Logger('chat');

  afterInit() {
    this.logger.log('로거부분');
  }
  @SubscribeMessage('newUser') //데코레이팅
  //컨트롤러 같은거
  //소켓으로 에밋 온 가능
  newUserController(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ): string {
    console.log(username);
    return 'Hello world!';
  }
}
