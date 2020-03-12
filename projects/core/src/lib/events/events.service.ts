import { Injectable } from '@angular/core';
import { ElementDefinitionComplex, elementHashTypeDefinitionConstants } from '../_types/element.types';
import { BoxModelService } from '../box-model/box-model.service';

@Injectable() export class EventsService {
  private readonly _defaultEventImmediatePropagation: boolean;
  private readonly _defaultSelectDomElement: ElementDefinitionComplex;

  constructor(private _bm: BoxModelService) {
    this._defaultEventImmediatePropagation = true;
    this._defaultSelectDomElement = { type: elementHashTypeDefinitionConstants.TAG, name: 'main' };
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
    if (event.cancelable) {
      event.preventDefault();
    }
  }

  public scrollTop(element?: ElementDefinitionComplex): void {
    const _element: ElementDefinitionComplex = element || this._defaultSelectDomElement;
    const _target: Element = this._bm.getElement(_element);
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
