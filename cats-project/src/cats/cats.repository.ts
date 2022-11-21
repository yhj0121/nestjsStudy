import { Injectable, HttpException } from '@nestjs/common';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.catModel.exists({
        email,
      });
      return true;
    } catch (err) {
      throw new HttpException('이메일없어요', 400);
    }
  }

  async findByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async createCats(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
