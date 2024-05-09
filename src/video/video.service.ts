import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './video.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class VideoService {
  constructor(@InjectModel(Video.name) private VideoModel: Model<Video>) {}
  async create(createVideoDto: CreateVideoDto) {
    const newVideo = await new this.VideoModel(createVideoDto).save();
    return newVideo;
  }

  async viewListOfVideos(titleQuery: string, sortByRating: boolean) {
    const aggregation: any[] = [];
    let videos;
    if (titleQuery) {
      aggregation.push({
        $match: {
          title: titleQuery,
        },
      });
    } else if (sortByRating) {
      aggregation.push({
        $sort: {
          rating: -1,
        },
      });
    } else {
      videos = await this.VideoModel.find();
      return videos;
    }

    videos = await this.VideoModel.aggregate(aggregation);
    return videos;
  }
  async viewVideo(_id: Types.ObjectId, user: any) {
    const video = await this.VideoModel.findById({ _id });
    if (!video) {
      throw new NotFoundException();
    }
    const dob = new Date(user['dob']);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dob.getFullYear();
    if (age < video.ageRestriction) {
      throw new ForbiddenException();
    }
    return video.link;
  }

  async RateVideo(_id: Types.ObjectId, rating: UpdateVideoDto) {
    const videoToUpdate = await this.VideoModel.findById({ _id });
    if (!videoToUpdate) {
      throw new NotFoundException();
    }
    const currentRating = videoToUpdate.rating;
    const numberOfRatings = videoToUpdate.numberOfRatings;
    let newRating;
    if (numberOfRatings !== 0) {
      newRating =
        (currentRating * numberOfRatings + rating['rating']) /
        (numberOfRatings + 1);
    } else {
      newRating = rating['rating'];
    }
    const updatedVideoObj = {
      rating: newRating,
      numberOfRatings: numberOfRatings + 1,
    };
    const result = await this.VideoModel.findOneAndUpdate(
      { _id },
      updatedVideoObj,
      { new: true },
    );
    return result;
  }
}
