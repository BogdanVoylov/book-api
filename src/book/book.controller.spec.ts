import { ClientProxy } from '@nestjs/microservices';
import { of } from 'rxjs';
import { BookController } from 'src/book/book.controller';
import { IBookRepository, BookRepository } from 'src/book/book.repository';
import { BookDTO } from 'src/book/dto/book.dto';

class BookRepositoryMock implements IBookRepository {
  selected: string;
  inserted: BookDTO;
  public async select(id: string): Promise<BookDTO[]> {
    this.selected = id;
    return [];
  }
  public async insert(book: BookDTO): Promise<string> {
    this.inserted = book;
    return '1cb0ee52-368a-4fb5-bc5a-5c68f11b6517';
  }
}
class ProxyMock {
  sentStr: string;
  sentObj: any;
  send(s: string, o: any) {
    this.sentStr = s;
    this.sentObj = o;
    return of(null);
  }
}
describe('BookController', () => {
  let bookRepository: BookRepositoryMock;
  let proxy: ProxyMock;
  let bookController: BookController;
  beforeEach(() => {
    bookRepository = new BookRepositoryMock();
    proxy = new ProxyMock();
    bookController = new BookController(bookRepository as any as BookRepository, proxy as any as ClientProxy);
  });
  describe('findAll', () => {
    it('should put to queue', async () => {
      const toInsert = { name: 'name', author: 'author' };
      await bookController.create(toInsert);
      await expect(proxy.sentObj).toMatchObject(toInsert);
    });

    it('should select from repo', async () => {
      const toSelect = { id: '1cb0ee52-368a-4fb5-bc5a-5c68f11b6517' };
      await bookController.get(toSelect);
      await expect(bookRepository.selected).toMatch(toSelect.id);
    });
  });
});
