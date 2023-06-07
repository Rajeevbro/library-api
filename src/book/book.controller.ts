import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book, Category } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { ObjectId } from 'mongoose';
import { UpdateBookDto } from './dto/update-book.dto';
import { query } from 'express';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BookController {
  constructor(private readonly bookservice: BookService) {}
  @Get()
  async findAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookservice.findAll(query);
  }

  @Post()
  async saveBook(
    @Body() book: CreateBookDto,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('author') author: string,
    @Body('price') price: number,
    @Body('category') category: Category,
  ): Promise<Book> {
    console.log(book);
    return this.bookservice.saveBook(
      title,
      description,
      author,
      price,
      category,
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findBookById(@Param('id') bookId: string): Promise<Book> {
    return this.bookservice.findBookById(bookId);
  }
  @Patch(':id')
  async updateBookById(@Param('id') id: string, @Body() book: UpdateBookDto) {
    return await this.bookservice.updateBookById(id, book);
  }

  @Delete(':id')
  async deleteById(@Param('id') bookId: string): Promise<Book> {
    return this.bookservice.DeleteById(bookId);
  }
}
