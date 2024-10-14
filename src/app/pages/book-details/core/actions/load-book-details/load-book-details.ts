import {
  Action,
  BaseDictionaryState,
  IAction,
} from '@grotem/grotem.box.angular.store';
import { BookDetailsState } from '../../state';

@Action('Load Book Details')
export class LoadBookDetails implements IAction<BookDetailsState> {
  public payload(state: BookDetailsState): Partial<BookDetailsState> {
    return {
      bookDetailsState: new BaseDictionaryState({
        ...state.bookDetailsState,
        loaded: false,
        loading: true,
        error: null,
      }),
    };
  }
}
