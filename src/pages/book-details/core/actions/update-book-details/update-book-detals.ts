import {
  Action,
  BaseDictionaryState,
  IAction,
} from '@grotem/grotem.box.angular.store';
import { BookDetailsState } from '../../state';

@Action('Update Book Details')
export class UpdateBookDetails implements IAction<BookDetailsState> {
  public payload(state: BookDetailsState): Partial<BookDetailsState> {
    return {
      bookDetailsUpdateState: new BaseDictionaryState({
        ...state.bookDetailsUpdateState,
        loaded: false,
        loading: true,
        error: null,
      }),
    };
  }
}
