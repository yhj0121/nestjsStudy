import { CatsRepository } from './cats.repository';
import { CatRequestDto } from './dto/cats.request.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}
  async signup(body: CatRequestDto) {
    const { email, name, password } = body;
    console.log(password);
    const isCatExist = await this.catsRepository.existByEmail(email);
    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.createCats({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
