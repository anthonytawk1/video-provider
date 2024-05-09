import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Reply {
  @Prop({ required: true })
  reply: string;
}

export type ReplyDocument = mongoose.HydratedDocument<Reply>;
export const ReplySchema = SchemaFactory.createForClass(Reply);
