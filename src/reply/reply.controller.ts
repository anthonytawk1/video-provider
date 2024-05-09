import { Controller, Post, Body, Param } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { Types } from 'mongoose';

@Controller('reply')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post(':id')
  create(
    @Param('id') commentId: Types.ObjectId,
    @Body() createReplyDto: CreateReplyDto,
  ) {
    return this.replyService.create(commentId, createReplyDto);
  }
}
