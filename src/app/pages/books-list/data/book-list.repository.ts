import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookPagedData } from '../core';
import { BookApi } from '../../../../shared/global-env/book-api';

@Injectable()
export class BookListRepository {
  constructor(private httpClient: HttpClient) {}

  public getBooks(page: number, size: number): Observable<BookPagedData> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.httpClient.get<BookPagedData>(
      `${BookApi.method}://${BookApi.address}:${BookApi.port}/books`,
      { params: params },
    );
  }
}
