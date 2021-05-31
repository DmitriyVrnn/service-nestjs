import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TopLevelCategory } from '../top-page.model';
import { prop } from '@typegoose/typegoose';

class HhDataDto {
  @IsNumber()
  count: number;

  @IsNumber()
  juniorSalary: number;

  @IsNumber()
  middleSalary: number;

  @IsNumber()
  seniorSalary: number;
}

class TopAdvantageDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class CreateTopPageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;

  @IsString()
  secondCategory: string;

  @IsString()
  alias: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => HhDataDto)
  hh?: HhDataDto;

  @IsArray()
  @Type(() => TopAdvantageDto)
  advantages: TopAdvantageDto[];

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
