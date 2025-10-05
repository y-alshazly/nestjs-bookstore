import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true })
export class Book {
  @Prop({ unique: true, required: true, trim: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  author: string;

  @Prop({ type: [String], default: [] })
  genres: string[];

  @Prop({ default: 0, min: 0 })
  price: number;

  @Prop({ default: 0, min: 0 })
  stock: number;

  @Prop({ type: Date })
  publishedAt: Date;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop()
  coverImageUrl: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
