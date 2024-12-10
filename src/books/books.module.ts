import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { BooksController } from './books.controller';
import { envs, BOOK_SERVICE} from 'src/config';

@Module({
  controllers: [BooksController],
  providers: [],
  imports:[
    ClientsModule.register([
      {
        name: BOOK_SERVICE,
        transport: Transport.TCP,
        options:{
          host: envs.productMicroserviceHost,
          port: envs.productMicroservicePort
        }
      }
    ])
  ]
})

export class BooksModule {}
