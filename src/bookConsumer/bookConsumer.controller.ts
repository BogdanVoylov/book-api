import { Controller, Logger } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { BookRepository } from 'src/book/book.repository';
import { BookDTO } from 'src/book/dto/book.dto';

@Controller()
export class BookConsumerController {
  private readonly logger = new Logger(BookConsumerController.name);
  constructor(private readonly bookRepository: BookRepository) {}
  @MessagePattern('rabbitmq-book')
  public async execute(@Payload() data: BookDTO, @Ctx() context: RmqContext) {
    this.logger.debug('Got message from the queue');
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    this.bookRepository.insert(data);
    channel.ack(orginalMessage);
  }
}
