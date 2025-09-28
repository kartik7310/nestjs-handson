
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../user.types';

export type CatDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true,unique:true })
  email: string;

  @Prop({ required: true })
  password: string;


  @Prop({ default: Role.STUDENT })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
