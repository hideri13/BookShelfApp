import {
  Action,
  BaseDictionaryState,
  IAction,
} from '@grotem/grotem.box.angular.store';
import { BookListState } from '../../state';
import { BookPaged } from '../../domain';

@Action('Load Book List Success')
export class LoadBookListSuccess implements IAction<BookListState> {
  constructor(private readonly data: BookPaged) {}

  public payload(state: BookListState): Partial<BookListState> {
    return {
      bookListState: new BaseDictionaryState({
        ...state.bookListState,
        loaded: true,
        loading: false,
        value: this.data,
      }),
    };
  }
}
