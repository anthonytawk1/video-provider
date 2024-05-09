import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reply, ReplySchema } from './reply.model';
import { Comment, CommentSchema } from 'src/comment/comment.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reply.name, schema: ReplySchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  controllers: [ReplyController],
  providers: [ReplyService],
})
export class ReplyModule {}
