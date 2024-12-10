import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';

import { PaginationDto } from 'src/common';
import { BOOK_SERVICE } from 'src/config';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {

  constructor(

    @Inject(BOOK_SERVICE) private readonly booksClient: ClientProxy,

  ) { }

  @Post()
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.booksClient.send({ cmd: 'create_book' }, createBookDto)
  }

  @Get()
  findAllBooks(@Query() paginationDto: PaginationDto) {
    return this.booksClient.send({ cmd: 'find_all' }, paginationDto)
  }

  @Get(':isbn')
  async findOne(@Param('isbn') isbn: string) {

    //! Option 1
    try {

      const book = await firstValueFrom(
        this.booksClient.send({ cmd: 'find_one_book' }, { isbn })
      )
      return book

    } catch (error) {
      throw new RpcException(error)
    }

  }

  @Patch(':isbn')
  updateBook(
    @Param('isbn') isbn: string,
    @Body() updateProductDto: UpdateBookDto) {
    return this.booksClient.send({ cmd: 'update_book' },
      {
        isbn,
        ...updateProductDto
      }).pipe(
        catchError(err => { throw new RpcException(err) })
      )
  }

  @Delete(':isbn')
  deleteBook(@Param('isbn') isbn: string) {
    return this.booksClient.send({ cmd: 'delete_book' }, { isbn })
      .pipe(
        catchError(err => { throw new RpcException(err) })
      )
  }

}
