import {
  Action,
  BaseDictionaryState,
  IAction,
} from '@grotem/grotem.box.angular.store';
import { BookListState } from '../../state';
import { HttpErrorResponse } from '@angular/common/http';

@Action('Load Book List Failure')
export class LoadBookListFailure implements IAction<BookListState> {
  constructor(private readonly error: HttpErrorResponse) {}

  public payload(state: BookListState): Partial<BookListState> {
    return {
      bookListState: new BaseDictionaryState({
        ...state.bookListState,
        loaded: true,
        loading: false,
        error: this.error,
      }),
    };
  }
}
