import { UserService } from './../service/user.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  ParseIntPipe,
  Param,
  Delete,
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

  @Get('reviews/:bookid')
  getBookService(@Param('bookid') param) {
    return this.userService.getBookservice(param);
  }

  @Post('reviews/:bookid')
  postBookservice(@Body() body, @Param('bookid', ParseIntPipe) param) {
    return this.userService.postBookService(param);
  }

  @Delete('delete')
  deleteUserService(@Body('userId', ParseIntPipe) userId) {
    return this.userService.deleteUser(userId);
  }

  @Get('book/get:bookid')
  getBookListService(@Param('bookid', ParseIntPipe) bookId) {
    return this.userService.getBookList(bookId);
  }
}
