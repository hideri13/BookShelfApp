import {
  Action,
  BaseDictionaryState,
  IAction,
} from '@grotem/grotem.box.angular.store';
import { BookListState } from '../../state';

@Action('Load Book List')
export class LoadBookList implements IAction<BookListState> {
  public payload(state: BookListState): Partial<BookListState> {
    return {
      bookListState: new BaseDictionaryState({
        ...state.bookListState,
        loaded: false,
        loading: true,
        error: null,
      }),
    };
  }
}
