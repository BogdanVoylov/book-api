import { Injectable } from '@nestjs/common';
import DbService from 'src/db/db.service';
import { wait } from 'src/utils/load';
import { BookDTO } from './dto/book.dto';

@Injectable()
export class BookRepository {
  constructor(private readonly dbService: DbService) {}

  public async insert(book: BookDTO): Promise<string> {
    const [_, [{ id }]] = await this.dbService.query<{ id: string }>({
      text: 'INSERT INTO book(id,name,author) VALUES ($1,$2,$3) returning id',
      values: [book.id, book.name, book.author],
    });
    return id;
  }

  public async select(id: string): Promise<BookDTO[]> {
    await wait(3000);
    return this.dbService
      .query<BookDTO>({ text: 'select id,name,author from book where id=$1', values: [id] })
      .then((r) => r[1]);
  }
}
