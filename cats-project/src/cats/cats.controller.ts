import { CatRequestDto } from './dto/cats.request.dto';
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
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exception/http.exception.filter';
import { SucessInterceptor } from 'src/common/interceptors/sucess.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';
@Controller('cats')
@UseInterceptors(SucessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공!',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signup(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn() {
    return 'login';
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
