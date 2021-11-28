import { Module } from '@nestjs/common';
import { BookModule } from 'src/book/book.module';
import { BookConsumerController } from './bookConsumer.controller';

@Module({ controllers: [BookConsumerController], imports: [BookModule] })
export class BookConsumerModule {}
