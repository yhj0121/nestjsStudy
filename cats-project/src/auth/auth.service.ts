import { CatsRepository } from './../cats/cats.repository';
import {
  Injectable,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginRequestDto } from './dto/login.RequestDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
//auth JwtModule 안에 있는 jwtService임
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginRequestDto) {
    const { email, password } = data;

    const cat = await this.catsRepository.findByEmail(email);
    if (!cat) {
      throw new HttpException('해당이메일이 없습니다', 401);
    }

    const isPasswordTrue: boolean = await bcrypt.compare(
      password,
      cat.password,
    );
    if (!isPasswordTrue) {
      throw new UnauthorizedException('비밀번호 확인 부탁');
    }

    const paypload = { email: email, id: cat.id };
    return {
      token: this.jwtService.sign(paypload),
    };
  }
}
