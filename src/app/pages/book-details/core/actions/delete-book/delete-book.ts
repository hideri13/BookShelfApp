import {
  Action,
  BaseDictionaryState,
  IAction,
} from '@grotem/grotem.box.angular.store';
import { BookDetailsState } from '../../state';

@Action('Delete Book')
export class DeleteBook implements IAction<BookDetailsState> {
  public payload(state: BookDetailsState): Partial<BookDetailsState> {
    return {
      bookDeleteState: new BaseDictionaryState({
        ...state.bookDeleteState,
        loaded: false,
        loading: true,
        error: null,
      }),
    };
  }
}
