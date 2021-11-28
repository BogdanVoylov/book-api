import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './book/book.module';
@Module({
  imports: [BookModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
