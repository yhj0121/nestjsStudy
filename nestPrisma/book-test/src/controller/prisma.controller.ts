import { PrismaService } from './../service/prisma.service';
import { Controller } from '@nestjs/common';

@Controller('prisma')
export class PrismaController {
  constructor(private readonly prismaService: PrismaService) {}
}
