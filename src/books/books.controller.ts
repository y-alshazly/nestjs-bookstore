import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { type FilterQuery, Types } from 'mongoose';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import { FindOneOptionsDto } from 'src/common/dto/find-one-options.dto';
import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dto';
import { BookDocument } from './schemas';
import { ParseMatchPipe } from 'src/common/pipes/parse-match.pipe';
import { InterceptRequestBody, InterceptResponseBody } from 'src/common/interceptors';
import { GetBookDto } from './dto/get-book.dto';
import { GetBooksDto } from './dto/get-books-dto';

@Controller('/v1/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @InterceptRequestBody()
  @InterceptResponseBody(GetBookDto)
  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @InterceptResponseBody(GetBooksDto)
  @Get()
  async findAll(
    @Query() query: QueryOptionsDto,
    @Query('match', new ParseMatchPipe<BookDocument>()) match: FilterQuery<BookDocument>,
  ) {
    return this.booksService.findAll(match, query);
  }

  @InterceptResponseBody(GetBookDto)
  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @Query() options: FindOneOptionsDto) {
    return this.booksService.getOne(id, options);
  }

  @InterceptRequestBody()
  @InterceptResponseBody(GetBookDto)
  @Patch(':id')
  async updateOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateOne(id, updateBookDto);
  }

  @InterceptResponseBody(GetBookDto)
  @Delete(':id')
  async deleteOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.booksService.deleteOne(id);
  }
}
