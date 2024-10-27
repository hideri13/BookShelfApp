import {
  BaseDictionaryState,
  IBaseDictionaryState,
  IState,
} from '@grotem/grotem.box.angular.store';
import { BookDetailed } from '../domain';

export class BookDetailsState implements IState<BookDetailsState> {
  public readonly actionType: string | undefined;
  public readonly payload: Partial<BookDetailsState> | undefined;

  public readonly bookDetailsState: IBaseDictionaryState<BookDetailed> =
    new BaseDictionaryState({ value: new BookDetailed() });
  public readonly bookDetailsUpdateState: IBaseDictionaryState<void> =
    new BaseDictionaryState();
  public readonly bookDeleteState: IBaseDictionaryState<void> =
    new BaseDictionaryState();

  constructor(
    state?: Partial<BookDetailsState>,
    payload?: Partial<BookDetailsState>,
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
