import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PopulateOptions, Types } from 'mongoose';

import { exceptions } from '../core/exceptions/constants';
import { Book } from './schemas';
import { CreateBookDto, UpdateBookDto } from './dto';
import { buildMongooseQueryOptions } from 'src/common/utils/mongoose-query.util';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import { FindOneOptions } from 'src/common/dto/find-one-options.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  private readonly defaultPopulate: PopulateOptions[] = [];

  async create(createBookDto: CreateBookDto, populate?: PopulateOptions[]) {
    const book = new this.bookModel({ ...createBookDto });

    await book.save();

    return await this.bookModel.populate(book, populate ?? this.defaultPopulate);
  }

  async findAll(match: FilterQuery<Book> = {}, queryOptions?: QueryOptionsDto, populate?: PopulateOptions[]) {
    const { fields, sort, limit, skip } = buildMongooseQueryOptions(queryOptions || {});

    const data = await this.bookModel
      .find(match)
      .select(fields ?? '')
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .populate(populate ?? this.defaultPopulate);

    return { data, total: data.length };
  }

  async findOne(id: Types.ObjectId, options?: FindOneOptions) {
    const { fields } = buildMongooseQueryOptions(options || {});

    return this.bookModel
      .findById(id)
      .select(fields ?? '')
      .populate(options?.populate ?? this.defaultPopulate)
      .exec();
  }

  async getOne(id: Types.ObjectId, options?: FindOneOptions) {
    const book = await this.findOne(id, options);

    if (!book) {
      throw new NotFoundException(exceptions.notFound.book);
    }

    return book;
  }

  async updateOne(id: Types.ObjectId, updateBookDto: UpdateBookDto, options?: FindOneOptions) {
    const book = await this.getOne(id, options);

    Object.assign(book, updateBookDto);

    await book.save();

    await book.populate(options?.populate ?? this.defaultPopulate);

    return book;
  }

  async deleteOne(id: Types.ObjectId, options?: FindOneOptions) {
    const book = await this.getOne(id, options);

    await book.deleteOne();

    await book.populate(options?.populate ?? this.defaultPopulate);

    return book;
  }
}
