import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { CatsController } from './controller/cats.controller';
import { CatsRepository } from './cats.repository';
import { Cat, CatSchema } from './cats.schema';
import { CatsService } from './service/cats.service';
import { MulterExtendedModule } from 'nestjs-multer-extended';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    forwardRef(() => AuthModule),
    MulterExtendedModule.register({
      awsConfig: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY,
        region: process.env.AWS_S3_REGION,
        // ... any options you want to pass to the AWS instance
      },
      bucket: process.env.AWS_S3_BUCKET_NAME,
      basePath: 'cis',
      fileSize: 1 * 1024 * 1024,
    }),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
