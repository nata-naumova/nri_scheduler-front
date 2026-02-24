import { atom } from 'nanostores';
import { IApiEvent } from '../api/types';

export const $event = atom<IApiEvent | null>(null);
export const $fetchingEvent = atom<boolean>(false);
