import {
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
  Min,
  IsDateString,
  IsBoolean,
  IsUrl,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  genres?: string[];

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;

  @IsDateString()
  @IsOptional()
  publishedAt?: Date;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsUrl()
  @IsOptional()
  coverImageUrl?: string;
}
