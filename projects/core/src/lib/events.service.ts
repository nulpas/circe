import { Injectable } from '@angular/core';
import { SelectDomElementObject } from './_types/data.types';

@Injectable() export class EventsService {
  private readonly _defaultEventImmediatePropagation: boolean;
  private readonly _defaultSelectDomElement: SelectDomElementObject = { type: 'tag', name: 'main' };

  constructor() {
    this._defaultEventImmediatePropagation = true;
  }

  public preventNeededEvent(event: Event, immediatePropagation?: boolean): void {
    const _immediate: boolean = immediatePropagation || this._defaultEventImmediatePropagation;
    if (_immediate) {
      event.stopImmediatePropagation();
    } else {
      event.stopPropagation();
    }
  }

  public preventNoNeededEvent(event: Event, immediatePropagation?: boolean): void {
    const _immediate: boolean = immediatePropagation || this._defaultEventImmediatePropagation;
    this.preventNeededEvent(event, _immediate);
    event.preventDefault();
  }

  public scrollTop(element?: SelectDomElementObject): void {
    const _element: SelectDomElementObject = element || this._defaultSelectDomElement;
    let _target: Element = null;
    if (_element.type === 'tag') {
      _target = document.getElementsByTagName(_element.name).item(0);
    } else if (_element.type === 'class') {
      _target = document.getElementsByClassName(_element.name).item(0);
    } else if (_element.type === 'id') {
      _target = document.getElementById(_element.name);
    }
    if (_target) {
      (_target as HTMLElement).scroll(0, 0);
    }
  }


  /**
   * @deprecated
   */
  public preventMouseEvent(event: any, immediatePropagation?: boolean): void {
    const _immediate: boolean = immediatePropagation || this._defaultEventImmediatePropagation;
    if (_immediate) {
      (event as MouseEvent).stopImmediatePropagation();
    } else {
      (event as MouseEvent).stopPropagation();
    }
    (event as MouseEvent).preventDefault();
  }

  /**
   * @deprecated
   */
  public preventKeyEvent(event: any, immediatePropagation?: boolean): void {
    const _immediate: boolean = immediatePropagation || this._defaultEventImmediatePropagation;
    if (_immediate) {
      (event as KeyboardEvent).stopImmediatePropagation();
    } else {
      (event as KeyboardEvent).stopPropagation();
    }
  }
}
