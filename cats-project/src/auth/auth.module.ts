import { CatsModule } from './../../../step2/test-nest/src/cats/cats.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CatsRepository } from 'src/cats/cats.repository';
@Module({
  //Passport는 로그인 할때
  //jwt날라왔을떄 인증
  //모듈을 임포트하면 exports된것을 사용가능
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    forwardRef(() => CatsModule), //서로 참조 하고 있을떄
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
