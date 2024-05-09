import { IsNumber, IsString } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  duration: string;

  @IsString()
  link: string;

  @IsNumber()
  ageRestriction: number;
}
