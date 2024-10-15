import { Injectable, OnDestroy } from '@angular/core';
import { BookListState } from './state';
import {
  IStore,
  ObservableState,
  Store,
} from '@grotem/grotem.box.angular.store';
import * as actions from './actions';
import { Subject, takeUntil } from 'rxjs';
import { BookListRepository } from '../data';
import { BookPaged } from './domain';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
@Store({
  name: 'books-list',
  initState: new BookListState(),
  mutateStateFn: actions.mutateState,
})
export class BookListFacade implements OnDestroy {
  public state$: ObservableState<BookListState>;

  private store!: IStore<BookListState>;
  private _destroy$ = new Subject<void>();

  constructor(private readonly bookListRepository: BookListRepository) {
    this.state$ = this.store.state$;
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public resetState(): void {
    this.store.resetStore();
  }

  public loadBooksList(page: number, size: number): void {
    this.store.dispatch(new actions.LoadBookList());

    this.bookListRepository
      .getBooks(page, size)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (data: BookPaged): void => {
          this.store.dispatch(new actions.LoadBookListSuccess(data));
        },
        error: (error: HttpErrorResponse): void => {
          this.store.dispatch(new actions.LoadBookListFailure(error));
        },
      });
  }
}
