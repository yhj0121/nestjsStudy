import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], //내보내기 해줘야 외부에서 사용가능 public으로 바꿔준 상태

})
export class CatsModule {}
