import {
  Action,
  BaseDictionaryState,
  IAction,
} from '@grotem/grotem.box.angular.store';
import { BookDetailsState } from '../../state';
import { HttpErrorResponse } from '@angular/common/http';

@Action('Update Book Details Failure')
export class UpdateBookDetailsFailure implements IAction<BookDetailsState> {
  constructor(private readonly error: HttpErrorResponse) {}

  public payload(state: BookDetailsState): Partial<BookDetailsState> {
    return {
      bookDetailsUpdateState: new BaseDictionaryState({
        ...state.bookDetailsUpdateState,
        loaded: true,
        loading: false,
        error: this.error,
      }),
    };
  }
}
