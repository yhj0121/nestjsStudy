import { CatCurrentDto } from './../../cats/dto/cats.current.dto';
import { Request } from 'express';
import { Cat } from '../../cats/cats.schema';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//데코레이터 수정
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.user as CatCurrentDto;
  },
);
