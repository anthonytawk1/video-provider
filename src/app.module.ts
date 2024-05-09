import { Module } from '@nestjs/common';
import { VideoModule } from './video/video.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModule } from './comment/comment.module';
import { ReplyModule } from './reply/reply.module';

@Module({
  imports: [
    VideoModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.connectionString'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [config],
    }),
    VideoModule,
    CommentModule,
    ReplyModule,
  ],
})
export class AppModule {}
