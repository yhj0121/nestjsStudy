import { CatsService } from './cats.service';
import { Controller, Get, Post, Put, Patch } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // cats/
  @Get()
  getAllCat() {
  return 'all cats';
  }

  @Get(':id')
  getOneCat() {
    return 'id';
  }

  @Post()
  postId() {
    return 'post';
  }

  @Put(':id')
  putput() {
    return 'put';
  }

  @Patch(':id')
  patchId() {
    return 'pateh';
  }

}
