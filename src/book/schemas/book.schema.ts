import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Category {
  ADVENTURE = 'Adventure',
  CLASSICS = 'Classics',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
  BIOGRAPHY = 'Biography',
}

@Schema({
  timestamps: true,
})
export class Book extends Document {
  @Prop({ type: String, required: true, unique: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  author: string;
  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ required: true })
  category: Category;
}

export const BookSchema = SchemaFactory.createForClass(Book);
