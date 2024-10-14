import { Injectable, OnDestroy } from '@angular/core';
import {
  IStore,
  ObservableState,
  Store,
} from '@grotem/grotem.box.angular.store';
import { BookDetailsState } from './state';
import { Subject, takeUntil } from 'rxjs';
import { BookDetailsRepository } from '../data';
import * as actions from './actions';
import { BookDetailedData } from './domain';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
@Store({
  name: 'books-details',
  initState: new BookDetailsState(),
  mutateStateFn: actions.mutateState,
})
export class BookDetailsFacade implements OnDestroy {
  public state$: ObservableState<BookDetailsState>;

  private store!: IStore<BookDetailsState>;
  private _destroy$ = new Subject<void>();

  constructor(private readonly bookDetailsRepository: BookDetailsRepository) {
    this.state$ = this.store.state$;
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public resetState(): void {
    this.store.resetStore();
  }

  public loadBookDetails(id: string): void {
    this.store.dispatch(new actions.LoadBookDetails());
    this.bookDetailsRepository
      .getBookById(id)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (data: BookDetailedData): void => {
          this.store.dispatch(new actions.LoadBookDetailsSuccess(data));
        },
        error: (error: HttpErrorResponse): void => {
          this.store.dispatch(new actions.LoadBookDetailsFailure(error));
        },
      });
  }

  public updateBookDetails(id: string, bookData: BookDetailedData): void {
    this.store.dispatch(new actions.UpdateBookDetails());
    this.bookDetailsRepository
      .postUpdateBook(id, bookData)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (): void => {
          this.store.dispatch(new actions.UpdateBookDetailsSuccess());
        },
        error: (error: HttpErrorResponse): void => {
          this.store.dispatch(new actions.UpdateBookDetailsFailure(error));
        },
      });
  }

  public deleteBook(id: string): void {
    this.store.dispatch(new actions.DeleteBook());
    this.bookDetailsRepository
      .postDeleteBook(id)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (): void => {
          this.store.dispatch(new actions.DeleteBookSuccess());
        },
        error: (error: HttpErrorResponse): void => {
          this.store.dispatch(new actions.DeleteBookFailure(error));
        },
      });
  }
}
