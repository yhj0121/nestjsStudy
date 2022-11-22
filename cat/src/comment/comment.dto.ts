import { PickType } from '@nestjs/swagger';
import { Comment } from './comment.schema';

export class CommentsDto extends PickType(Comment, [
  'author',
  'content',
] as const) {}
