import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[ccButtonSpinner]'
})
export class ButtonSpinnerDirective implements OnInit, OnDestroy {
  @Input()
  set on(on: boolean) {
    if (on) {
      const _elementRect: ClientRect | DOMRect = this._element.getBoundingClientRect();
      this._element.style.width = `${_elementRect.width}px`;
      this._element.style.height = `${_elementRect.height}px`;
      this._element.classList.add('no-events');
    } else {
      this._element.style.width = 'unset';
      this._element.style.height = 'unset';
      this._element.classList.remove('no-events');
    }
    this._on = on;
  }
  get on(): boolean {
    return this._on;
  }

  private _element: HTMLElement;
  private _on: boolean;

  constructor(private _el: ElementRef<HTMLElement>) {
    this._element = _el.nativeElement;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
