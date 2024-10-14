import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookDetailedData, BookModifiedResponse } from '../core/domain';
import { BookApi } from '../../../../shared/global-env/book-api';

@Injectable()
export class BookDetailsRepository {
  constructor(private httpClient: HttpClient) {}

  public getBookById(bookId: string): Observable<BookDetailedData> {
    return this.httpClient.get<BookDetailedData>(
      `${BookApi.method}://${BookApi.address}:${BookApi.port}/books/${bookId}`,
    );
  }

  public postUpdateBook(
    bookId: string,
    book: BookDetailedData,
  ): Observable<BookModifiedResponse> {
    return this.httpClient.post<BookModifiedResponse>(
      `${BookApi.method}://${BookApi.address}:${BookApi.port}/books/update/${bookId}`,
      book,
    );
  }

  public postDeleteBook(bookId: string): Observable<BookModifiedResponse> {
    return this.httpClient.post<BookModifiedResponse>(
      `${BookApi.method}://${BookApi.address}:${BookApi.port}/books/delete/${bookId}`,
      {},
    );
  }
}
