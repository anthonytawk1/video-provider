import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCommentDto {
  @IsString()
  comment: string;

  @IsOptional()
  @IsMongoId()
  videoId: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  createdBy: Types.ObjectId;
}
