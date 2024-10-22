import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookDetailed, BookModifiedResponse } from '../core';
import { BookApi } from '../../../../shared';

@Injectable()
export class BookDetailsRepository {
  constructor(private httpClient: HttpClient) {}

  public getBookById(bookId: string): Observable<BookDetailed> {
    return this.httpClient.get<BookDetailed>(
      `${BookApi.method}://${BookApi.address}:${BookApi.port}/books/${bookId}`,
    );
  }

  public postUpdateBook(
    bookId: string,
    book: BookDetailed,
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
