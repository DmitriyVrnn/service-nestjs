import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class UserModel extends TimeStamps {
  @prop()
  _id: string;

  @prop({ unique: true })
  email: string;

  @prop()
  passwordHash: string;
}
