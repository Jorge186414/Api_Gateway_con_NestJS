import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BOOK_SERVICE } from 'src/config';

@Controller('books')
export class BooksController {

  constructor(

    @Inject(BOOK_SERVICE) private readonly booksClient: ClientProxy,

  ) { }

}
