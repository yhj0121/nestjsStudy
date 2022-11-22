import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comment extends Document {
  @ApiProperty({
    description: '댓글내용',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: '좋아요',
    required: true,
  })
  @Prop({
    required: true,
    default: 0,
  })
  @IsNotEmpty()
  @IsPositive()
  like: number;

  @ApiProperty({
    description: '고양이 아이디',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats', //참조하기 위함
  })
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    description: '작성대상 게시물 ',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats', //참조하기 위함
  })
  @IsNotEmpty()
  info: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
