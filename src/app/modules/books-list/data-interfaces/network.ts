import { BookSummary } from './bookSummary';

export interface BookPagedData {
  totalCount: number;
  books: BookSummary[];
}
