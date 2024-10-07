import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { BookPagedData } from '../data-interfaces/network';
import { BookApi } from '../../../../shared/global-env/book-api';

@Injectable()
export class BookListNetworkService {
  constructor(private httpClient: HttpClient) {}

  public getBooks(
    page: number,
    size: number,
  ): Observable<BookPagedData | Error> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.httpClient
      .get<
        BookPagedData | Error
      >(`${BookApi.method}://${BookApi.address}:${BookApi.port}/books`, { params: params })
      .pipe(take(1));
  }
}
