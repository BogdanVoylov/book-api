import {
  Controller,
  Post,
  Body,
  Get,
  CacheTTL,
  UseInterceptors,
  CacheInterceptor,
  Query,
  Inject,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookDTO, GetBookQueryDTO, CreateBookDTO } from './dto/book.dto';
import { BookRepository } from './book.repository';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
@ApiTags('book')
@Controller('book')
@UseInterceptors(CacheInterceptor)
export class BookController {
  constructor(private bookRepository: BookRepository, @Inject('BOOK_QUEUE') private bookQueue: ClientProxy) {}

  @Post()
  @ApiCreatedResponse({ type: String, description: 'Id of created book' })
  @ApiInternalServerErrorResponse()
  async create(@Body() book: CreateBookDTO) {
    const id = uuid();
    const obs = this.bookQueue.send('rabbitmq-book', { ...book, id });
    await lastValueFrom(obs, { defaultValue: null });
    return id;
  }

  @Get()
  @CacheTTL(300)
  @ApiResponse({
    status: 200,
    type: BookDTO,
  })
  async get(@Query() query: GetBookQueryDTO) {
    return await this.bookRepository.select(query.id);
  }
}
