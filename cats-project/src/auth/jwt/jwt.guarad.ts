import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable() //Authguard는 stategy 자동 실행
export class jwtAuthGuard extends AuthGuard('jwt') {}
