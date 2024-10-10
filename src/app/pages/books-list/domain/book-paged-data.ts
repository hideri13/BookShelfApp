import { BookSummary } from './book-summary';

export interface BookPagedData {
  totalCount: number;
  books: BookSummary[];
}

export class BookPaged implements BookPagedData {
  public readonly totalCount: number = 0;
  public readonly books: BookSummary[] = [];

  constructor(params?: Partial<BookPagedData>) {
    this.totalCount = params?.totalCount ?? 0;
    this.books = params?.books ?? new Array<BookSummary>();
  }
}
