import { UserService } from './../service/user.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  ParseIntPipe,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  getUser(@Body() body): any {
    return this.userService.users(body);
  }

  @Post('faker')
  getUserFaker(@Body() body): string {
    return this.userService.createFakeUser(body);
  }

  @Get()
  getFaker(@Query('page', ParseIntPipe) page) {
    return this.userService.getFaker(page);
  }
}