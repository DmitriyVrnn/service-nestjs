import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export class HhData {
  @prop()
  count: number;

  @prop()
  juniorSalary: number;

  @prop()
  middleSalary: number;

  @prop()
  seniorSalary: number;
}

export class TopAdvantage {
  @prop()
  title: string;

  @prop()
  description: string;
}

export class TopPageModel extends TimeStamps {
  _id: Types.ObjectId;

  @prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @prop()
  secondCategory: string;

  @prop({ unique: true })
  alias: string;

  @prop()
  title: string;

  @prop()
  category: string;

  @prop({ type: () => [HhData] })
  hh?: HhData;

  @prop({ type: () => [TopAdvantage] })
  advantages: TopAdvantage[];

  @prop()
  seoText: string;

  @prop()
  tagsTitle: string;

  @prop({ type: () => [String] })
  tags: string[];
}
