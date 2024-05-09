import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment } from './comment.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private CommentModel: Model<Comment>,
  ) {}
  async addComment(
    videoId: Types.ObjectId,
    createCommentDto: CreateCommentDto,
    user: any
  ) {
    createCommentDto.createdBy = user.userId
    createCommentDto.videoId = videoId;
    const result = await new this.CommentModel(createCommentDto).save();
    return result;
  }

  async viewAllComments(videoId: Types.ObjectId) {
    const aggregation: any[] = [
      {
        $match: {
          videoId: videoId,
        },
      },
      {
        $lookup: {
          from: 'replies',
          localField: 'repliesId',
          foreignField: '_id',
          as: 'replies',
        },
      },
      {
        $group: {
          _id: '$_id',
          comment: {
            $first: '$comment',
          },
          createdAt: {
            $first: '$createdAt',
          },
          replies: {
            $push: '$replies',
          },
        },
      },
      {
        $unwind: {
          path: '$replies',
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $project: {
          _id: 0,
          createdAt: 0,
          'replies._id': 0,
          'replies.createdAt': 0,
          'replies.updatedAt': 0,
        },
      },
    ];
    const result = await this.CommentModel.aggregate(aggregation);
    return result;
  }

  async updateComment(_id: Types.ObjectId, updateCommentDto: UpdateCommentDto, user: any) {
    const result = await this.CommentModel.findOneAndUpdate(
      { _id, createdBy: user.userId },
      updateCommentDto,
      { new: true },
    );
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }
}
