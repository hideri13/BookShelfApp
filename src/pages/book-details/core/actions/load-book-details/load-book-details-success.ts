import {
  Action,
  BaseDictionaryState,
  IAction,
} from '@grotem/grotem.box.angular.store';
import { BookDetailsState } from '../../state';
import { BookDetailed } from '../../domain';

@Action('Load Book Details Success')
export class LoadBookDetailsSuccess implements IAction<BookDetailsState> {
  constructor(private readonly data: BookDetailed) {}

  public payload(state: BookDetailsState): Partial<BookDetailsState> {
    return {
      bookDetailsState: new BaseDictionaryState({
        ...state.bookDetailsState,
        loaded: true,
        loading: false,
        value: this.data,
      }),
    };
  }
}
