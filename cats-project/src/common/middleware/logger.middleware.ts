import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  //app.use와 비슷한 구조다
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      this.logger.log(req.originalUrl);
      this.logger.log(`${res.statusCode} ${req.originalUrl}`);
    });
    next();
  }
}
