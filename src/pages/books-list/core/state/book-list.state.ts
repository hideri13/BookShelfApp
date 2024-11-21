import {
  BaseDictionaryState,
  IBaseDictionaryState,
  IState,
} from '@grotem/grotem.box.angular.store';
import { BookPaged } from '../domain';

export class BookListState implements IState<BookListState> {
  public readonly actionType: string | undefined;
  public readonly payload: Partial<BookListState> | undefined;

  public readonly bookListState: IBaseDictionaryState<BookPaged> =
    new BaseDictionaryState({ value: new BookPaged() });

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
