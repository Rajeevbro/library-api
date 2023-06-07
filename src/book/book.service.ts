import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, Category } from './schemas/book.schema';
import mongoose, { Model, Mongoose, ObjectId } from 'mongoose';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async findAll(query: ExpressQuery): Promise<Book[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const books = await this.bookModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return books;
  }

  async findBookById(_id: string): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(_id);
    if (!isValidId) {
      throw new BadRequestException('Please Enter a correct Id');
    }
    const book = await this.bookModel.findById(_id);
    if (!book) {
      throw new NotFoundException('Book Not Found');
    }
    return book;
  }

  async DeleteById(id: string): Promise<Book> {
    try {
      const book = await this.bookModel.findOneAndDelete({ _id: id });

      return book;
    } catch (error) {
      throw new Error();
    }
  }

  async saveBook(
    title: string,
    description: string,
    author: string,
    price: number,
    category: Category,
  ): Promise<Book> {
    try {
      const bookObject = new this.bookModel({
        title,
        description,
        author,
        price,
        category,
      });
      const response = await bookObject.save();
      return response;
    } catch (error) {
      throw new NotAcceptableException();
    }
  }

  async updateBookById(id: string, updatedBook: UpdateBookDto) {
    try {
      const updatedBooks = await this.bookModel.findByIdAndUpdate(
        { _id: id },
        updatedBook,
        {
          new: true,
          runValidators: true,
        },
      );
      console.log(updatedBooks);
      return updatedBooks;
    } catch (error) {
      throw new Error(error);
    }
  }
}
