import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Headers,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Types } from 'mongoose';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }

  @Get()
  viewListOfVideos(
    @Query('title') titleQuery: string,
    @Query('sortByRating') sortByRating: boolean,
  ) {
    return this.videoService.viewListOfVideos(titleQuery, sortByRating);
  }
  @Get(':id')
  viewVideo(
    @Param('id') _id: Types.ObjectId,
    @Headers('User-Data') user: string,
  ) {
    return this.videoService.viewVideo(_id, JSON.parse(user));
  }
  @Patch(':id')
  RateVideo(@Param('id') _id: Types.ObjectId, @Body() rating: UpdateVideoDto) {
    return this.videoService.RateVideo(_id, rating);
  }
}
