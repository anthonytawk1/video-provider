import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Video {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  ageRestriction: number;

  @Prop({ reuired: true })
  link: string;

  @Prop({ default: 0 })
  numberOfRatings: number;

  @Prop({ default: 0 })
  rating: number;
}

export type VideoDocument = mongoose.HydratedDocument<Video>;
export const VideoSchema = SchemaFactory.createForClass(Video);
VideoSchema.index({ title: 1, rating: 1 });
VideoSchema.index({ rating: 1 });
