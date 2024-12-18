import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookPaged } from '../core';
import { BookApi } from '../../../shared';

@Injectable()
export class BookListRepository {
  constructor(private httpClient: HttpClient) {}

  public getBooks(page: number, size: number): Observable<BookPaged> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.httpClient.get<BookPaged>(
      `${BookApi.method}://${BookApi.address}:${BookApi.port}/books`,
      { params: params },
    );
  }
}
