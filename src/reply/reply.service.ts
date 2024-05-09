import { Injectable } from '@nestjs/common';
import { CreateReplyDto } from './dto/create-reply.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Reply } from './reply.model';
import { Model, Types } from 'mongoose';
import { Comment } from 'src/comment/comment.model';

@Injectable()
export class ReplyService {
  constructor(
    @InjectModel(Reply.name) private ReplyModel: Model<Reply>,
    @InjectModel(Comment.name) private CommentModel: Model<Comment>,
  ) {}
  async create(_id: Types.ObjectId, createReplyDto: CreateReplyDto) {
    const result = await new this.ReplyModel(createReplyDto).save();
    await this.CommentModel.findOneAndUpdate(
      { _id },
      { $push: { repliesId: result._id } },
      { new: true },
    );
    return result;
  }
}
