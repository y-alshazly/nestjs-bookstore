import { Expose, Transform } from 'class-transformer';
import { Types } from 'mongoose';

export class GetBookDto {
  @Expose()
  @Transform(({ obj }: { obj: { _id: Types.ObjectId } }) => obj._id)
  _id?: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  author: string;

  @Expose()
  genres: string[];

  @Expose()
  price: number;

  @Expose()
  stock: number;

  @Expose()
  publishedAt: Date;

  @Expose()
  isAvailable: boolean;

  @Expose()
  coverImageUrl: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
