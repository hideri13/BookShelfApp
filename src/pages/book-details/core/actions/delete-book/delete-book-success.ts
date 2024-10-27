import {
  Action,
  BaseDictionaryState,
  IAction,
} from '@grotem/grotem.box.angular.store';
import { BookDetailsState } from '../../state';

@Action('Delete Book Success')
export class DeleteBookSuccess implements IAction<BookDetailsState> {
  public payload(state: BookDetailsState): Partial<BookDetailsState> {
    return {
      bookDeleteState: new BaseDictionaryState({
        ...state.bookDeleteState,
        loaded: true,
        loading: false,
        error: null,
      }),
    };
  }
}
