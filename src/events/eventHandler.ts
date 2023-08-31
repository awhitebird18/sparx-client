type EventListenerCallback<T> = (data: T) => void;

type EventListeners<T> = {
  [eventName: string]: Array<EventListenerCallback<T>>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const eventListeners: EventListeners<any> = {};

export function addEventListener<T>(eventName: string, callback: EventListenerCallback<T>): void {
  if (!eventListeners[eventName]) {
    eventListeners[eventName] = [];
  }
  eventListeners[eventName].push(callback);
}

export function removeEventListener<T>(
  eventName: string,
  callback: EventListenerCallback<T>,
): void {
  if (eventListeners[eventName]) {
    eventListeners[eventName] = eventListeners[eventName].filter(
      (listener) => listener !== callback,
    );
  }
}

export function dispatchEvent<T>(eventName: string, data: T): void {
  if (eventListeners[eventName]) {
    eventListeners[eventName].forEach((listener) => listener(data));
  }
}
