import { CatsService } from './cats.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  HttpException,
  UseFilters,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exception/http.exception.filter';
@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // cats/
  @Get()
  //필터코드를 다 맞춰서 나오게함
  getAllCat() {
    throw new HttpException('api is broken', 401);

    return 'all cats';
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe) param) {
    console.log(typeof param);
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
