import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from '../schemas/book.schema';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
  @IsEnum(Category, { message: 'Please Enter Correct Categories' })
  @IsNotEmpty()
  readonly category: Category;
}
