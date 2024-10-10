import { Injectable, OnDestroy } from '@angular/core';
import { BookListState } from './state';
import {
  IStore,
  ObservableState,
  Store,
} from '@grotem/grotem.box.angular.store';
import * as actions from './actions';
import { Subject } from 'rxjs';
import { BookListRepository } from '../data/book-list.repository';

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
}
