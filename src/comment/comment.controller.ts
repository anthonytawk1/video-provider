import { Controller, Get, Post, Body, Patch, Param, Headers } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Types } from 'mongoose';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':id')
  create(
    @Param('id') videoId: Types.ObjectId,
    @Body() createCommentDto: CreateCommentDto,
    @Headers('User-Data') userData: string
  ) {
    return this.commentService.addComment(videoId, createCommentDto, JSON.parse(userData));
  }

  @Get(':id')
  findAll(@Param('id') videoId: Types.ObjectId) {
    return this.commentService.viewAllComments(videoId);
  }

  @Patch(':id')
  update(
    @Param('id') id: Types.ObjectId,
    @Body() updateCommentDto: UpdateCommentDto,
    @Headers('User-Data') userData: string
  ) {
    return this.commentService.updateComment(id, updateCommentDto, JSON.parse(userData));
  }
}
