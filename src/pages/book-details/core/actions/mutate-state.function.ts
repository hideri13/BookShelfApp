import {BookDetailsState} from '../state';

/**
 * Изменить (мутировать) состояние хранилища
 *
 * @param state - старое состояние хранилища
 * @param payload - изменения хранилища
 * @param type - тип (название) действия над хранилищем (action)
 * @returns - новое состояние хранилища
 */
export function mutateState(
  state: BookDetailsState,
  // eslint-disable-next-line @typescript-eslint/tslint/config
  payload: { [key in keyof Partial<BookDetailsState>]: any },
  type: string,
): BookDetailsState {
  return new BookDetailsState(
    {
      ...state,
      ...payload,
    },
    payload,
    type,
  );
}
