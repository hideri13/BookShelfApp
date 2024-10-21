import {
  Action,
  BaseDictionaryState,
  IAction,
} from '@grotem/grotem.box.angular.store';
import { BookDetailsState } from '../../state';
import { HttpErrorResponse } from '@angular/common/http';

@Action('Load Book Details Failure')
export class LoadBookDetailsFailure implements IAction<BookDetailsState> {
  constructor(private readonly error: HttpErrorResponse) {}

  public payload(state: BookDetailsState): Partial<BookDetailsState> {
    return {
      bookDetailsState: new BaseDictionaryState({
        ...state.bookDetailsState,
        loaded: true,
        loading: false,
        error: this.error,
      }),
    };
  }
}