import {
  BaseDictionaryState,
  IBaseDictionaryState,
  IState,
} from '@grotem/grotem.box.angular.store';
import { BookSummary } from '../../data-interfaces/bookSummary';

export class BookListState implements IState<BookListState> {
  public readonly actionType: string | undefined;
  public readonly payload: Partial<BookListState> | undefined;

  public readonly bookListState: IBaseDictionaryState<BookSummary[]> =
    new BaseDictionaryState({ value: new Array<BookSummary>() });

  constructor(
    state?: Partial<BookListState>,
    payload?: Partial<BookListState>,
    actionType?: string,
  ) {
    if (state === undefined) {
      return;
    }

    Object.assign(this, state);

    this.actionType = actionType;
    this.payload = payload;
  }
}
