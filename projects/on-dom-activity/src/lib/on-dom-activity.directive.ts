import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[ccOnDomActivity]'
})

export class OnDomActivityDirective implements OnInit, OnDestroy {
  @Output() comeToDom: EventEmitter<HTMLElement> = new EventEmitter();
  @Output() goesFromDom: EventEmitter<HTMLElement> = new EventEmitter();

  private readonly _element: HTMLElement;

  constructor(private _el: ElementRef<HTMLElement>) {
    this._element = _el.nativeElement;
  }

  ngOnInit(): void {
    this.comeToDom.emit(this._element);
  }

  ngOnDestroy(): void {
    this.goesFromDom.emit(this._element);
  }
}
