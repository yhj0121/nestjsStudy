import { CommentService } from './../../../comment/comment.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { parseWithNodeMaps } from '@typescript-eslint/typescript-estree';
import { CommentsDto } from './comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({
    summary: '댓글보기',
  })
  @Get()
  async getComment() {
    return this.commentService.getAllComment();
  }

  @ApiOperation({
    summary: '댓글 쓰기',
  })
  @Post(':id')
  async PostComment(@Param('id') id: string, @Body() body: CommentsDto) {
    return this.commentService.PostComment();
  }

  @ApiOperation({
    summary: '좋아요 쓰기',
  })
  @Post(':id')
  async PlusLike(@Param('id') id: string) {
    return this.commentService.PlusLikeButton();
  }
}
