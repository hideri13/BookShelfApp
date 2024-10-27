import {
  Action,
  BaseDictionaryState,
  IAction,
} from '@grotem/grotem.box.angular.store';
import { BookDetailsState } from '../../state';
import { HttpErrorResponse } from '@angular/common/http';

@Action('Delete Book Failure')
export class DeleteBookFailure implements IAction<BookDetailsState> {
  constructor(private readonly error: HttpErrorResponse) {}

  public payload(state: BookDetailsState): Partial<BookDetailsState> {
    return {
      bookDeleteState: new BaseDictionaryState({
        ...state.bookDeleteState,
        loaded: true,
        loading: false,
        error: this.error,
      }),
    };
  }
}