import { Expose, Type } from 'class-transformer';

import { GetBookDto } from './get-book.dto';

export class GetBooksDto {
  @Type(() => GetBookDto)
  @Expose()
  data: GetBookDto[];

  @Expose()
  total: number;
}
