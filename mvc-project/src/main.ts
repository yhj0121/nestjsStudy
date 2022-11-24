import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public')); //path안에 있는 상위 폴더있는 public 폴더
  app.setBaseViewsDir(join(__dirname, '..', 'view')); //view폴더 에 있는 view
  app.setViewEngine('hbs');

  await app.listen(8001);
}
bootstrap();
