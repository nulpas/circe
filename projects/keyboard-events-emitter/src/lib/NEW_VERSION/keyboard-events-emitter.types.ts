export interface KeyboardEventsEmitterConfig {
  keysToEmit?: Array<string>;
  eventsToEmit: Array<KeyEventsAvailable>;
  keysToSpecialAction?: Array<string>;
  keysEmitScope?: KeyEventsScope;
}

export type KeyEventsAvailable = 'keydown' | 'keyup' | 'keypress';
export type KeyEventsScope = 'element' | 'global';

// ###### Directive constants:

export const keyEventsAvailable: Array<KeyEventsAvailable> = ['keydown', 'keyup', 'keypress'];
