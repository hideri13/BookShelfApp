import {BookListState} from '../state';

/**
 * Изменить (мутировать) состояние хранилища
 *
 * @param state - старое состояние хранилища
 * @param payload - изменения хранилища
 * @param type - тип (название) действия над хранилищем (action)
 * @returns - новое состояние хранилища
 */
export function mutateState(
  state: BookListState,
  // eslint-disable-next-line @typescript-eslint/tslint/config
  payload: { [key in keyof Partial<BookListState>]: any },
  type: string,
): BookListState {
  return new BookListState(
    {
      ...state,
      ...payload,
    },
    payload,
    type,
  );
}
