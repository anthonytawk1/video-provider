import { PartialType } from '@nestjs/mapped-types';
import { CreateVideoDto } from './create-video.dto';
import { IsNumber, Max, Min } from 'class-validator';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
