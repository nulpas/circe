import { Injectable } from '@angular/core';
import {
  SelectDomElementHash,
  SelectDomElementHashTypeDefinition,
  selectDomElementHashTypeDefinitionConstants
} from './_types/data.types';

@Injectable() export class EventsService {
  private readonly _selectDomElementHashTypeConstants: SelectDomElementHashTypeDefinition;

  private readonly _defaultEventImmediatePropagation: boolean;
  private readonly _defaultSelectDomElement: SelectDomElementHash;

  constructor() {
    this._selectDomElementHashTypeConstants = selectDomElementHashTypeDefinitionConstants;

    this._defaultEventImmediatePropagation = true;
    this._defaultSelectDomElement = { type: this._selectDomElementHashTypeConstants.TAG, name: 'main' };
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

  public scrollTop(element?: SelectDomElementHash): void {
    const _element: SelectDomElementHash = element || this._defaultSelectDomElement;
    let _target: Element = null;
    if (_element.type === this._selectDomElementHashTypeConstants.TAG) {
      _target = document.getElementsByTagName(_element.name).item(0);
    } else if (_element.type === this._selectDomElementHashTypeConstants.CLASS) {
      _target = document.getElementsByClassName(_element.name).item(0);
    } else if (_element.type === this._selectDomElementHashTypeConstants.ID) {
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
