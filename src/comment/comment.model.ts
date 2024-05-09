import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Comment {
  @Prop()
  createdBy: Types.ObjectId;
  
  @Prop({ required: true })
  comment: string;

  @Prop({ required: true })
  videoId: Types.ObjectId;

  @Prop()
  repliesId: [{ type: mongoose.Schema.Types.ObjectId; ref: 'reply' }];
}
export type CommentDocument = mongoose.HydratedDocument<Comment>;
export const CommentSchema = SchemaFactory.createForClass(Comment);
CommentSchema.index({ videoId: 1 });
