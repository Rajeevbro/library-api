import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, isRequired: true })
  name: string;
  @Prop({ type: String, isRequired: true, unique: true })
  email: string;

  @Prop({ type: String, isRequired: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
