import { Injectable } from '@angular/core';
import { SelectDomElementObject } from './_types/data.types';

@Injectable() export class EventsService {
  private readonly _defaultPreventMouseEventImmediatePropagation: boolean;
  private readonly _defaultPreventKeyEventImmediatePropagation: boolean;
  private readonly _defaultSelectDomElement: SelectDomElementObject = { type: 'tag', name: 'main' };

  constructor() {
    this._defaultPreventMouseEventImmediatePropagation = true;
    this._defaultPreventKeyEventImmediatePropagation = true;
  }

  public preventMouseEvent(event: any, immediatePropagation?: boolean): void {
    const _immediate: boolean = immediatePropagation || this._defaultPreventMouseEventImmediatePropagation;
    if (_immediate) {
      (event as MouseEvent).stopImmediatePropagation();
    } else {
      (event as MouseEvent).stopPropagation();
    }
    (event as MouseEvent).preventDefault();
  }

  public preventNoNeededEvent(event: any, immediatePropagation?: boolean): void {
    const _immediate: boolean = immediatePropagation || this._defaultPreventMouseEventImmediatePropagation;
    if (_immediate) {
      (event as MouseEvent | FocusEvent).stopImmediatePropagation();
    } else {
      (event as MouseEvent | FocusEvent).stopPropagation();
    }
    (event as MouseEvent | FocusEvent).preventDefault();
  }

  public preventKeyEvent(event: any, immediatePropagation?: boolean): void {
    const _immediate: boolean = immediatePropagation || this._defaultPreventKeyEventImmediatePropagation;
    if (_immediate) {
      (event as KeyboardEvent).stopImmediatePropagation();
    } else {
      (event as KeyboardEvent).stopPropagation();
    }
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
}
