import { IBookSummary } from './book-summary';

export class BookPaged {
  public readonly totalCount: number = 0;
  public readonly books: IBookSummary[] = [];

  constructor(params?: Partial<BookPaged>) {
    this.totalCount = params?.totalCount ?? 0;
    this.books = params?.books ?? new Array<IBookSummary>();
  }
}
