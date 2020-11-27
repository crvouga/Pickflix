//SOURCE: https://rjzaworski.com/2019/10/event-emitters-in-typescript
import { EventEmitter } from "events";

type EventMap = Record<string, any>;

type EventKey<T extends EventMap> = string & keyof T;

type EventReceiver<T> = (params: T) => void;

export interface Emitter<T extends EventMap> {
  on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
  off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
  emit<K extends EventKey<T>>(eventName: K, params?: T[K]): void;
}

export const createEventEmitter = <T extends EventMap>(): Emitter<T> => {
  return new EventEmitter();
};

export enum EventTypes {
  USER_CREATED = "USER_CREATED",
}
