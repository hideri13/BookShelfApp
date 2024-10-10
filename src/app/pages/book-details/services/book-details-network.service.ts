import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { BookDetailed } from '../data-interfaces/book-detailed';
import { BookApi } from '../../../../shared/global-env/book-api';
import { BookModifiedResponse } from '../data-interfaces/network';

@Injectable()
export class BookDetailsNetworkService {
  constructor(private httpClient: HttpClient) {}

  public getBookById(bookId: string): Observable<BookDetailed | Error> {
    return this.httpClient
      .get<
        BookDetailed | Error
      >(`${BookApi.method}://${BookApi.address}:${BookApi.port}/books/${bookId}`)
      .pipe(take(1));
  }

  public postUpdateBook(
    bookId: string,
    book: BookDetailed,
  ): Observable<BookModifiedResponse | Error> {
    return this.httpClient
      .post<
        BookModifiedResponse | Error
      >(`${BookApi.method}://${BookApi.address}:${BookApi.port}/books/update/${bookId}`, book)
      .pipe(take(1));
  }

  public postDeleteBook(
    bookId: string,
  ): Observable<BookModifiedResponse | Error> {
    return this.httpClient
      .post<
        BookModifiedResponse | Error
      >(`${BookApi.method}://${BookApi.address}:${BookApi.port}/books/delete/${bookId}`, {})
      .pipe(take(1));
  }
}
