import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { DbModule } from 'src/db/db.module';
import { ConfigService } from '@nestjs/config';
import { cacheModule } from 'src/cache/cache.module';
import { BookRepository } from './book.repository';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [DbModule, cacheModule()],
  controllers: [BookController],
  providers: [
    ConfigService,
    BookRepository,
    {
      provide: 'BOOK_QUEUE',
      useFactory: (configService: ConfigService) => {
        const user = configService.get('RABBITMQ_USER');
        const password = configService.get('RABBITMQ_PASSWORD');
        const host = configService.get('RABBITMQ_HOST');
        const queueName = 'book';

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}`],
            queue: queueName,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [BookRepository],
})
export class BookModule {}
