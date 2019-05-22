import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[ccClickOutside]'
})

export class ClickOutsideDirective {
  @Input() apply: boolean = false;
  @Input() exceptions: Array<string> = [];
  @Output() clickOutside: EventEmitter<void> = new EventEmitter();

  private readonly _element: HTMLElement;

  @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement: HTMLElement) {
    if (this.apply && !this._element.contains(targetElement) && (this.exceptions.indexOf(targetElement.id) < 0)) {
      this.clickOutside.emit();
    }
  }

  constructor(private _el: ElementRef) {
    this._element = this._el.nativeElement;
  }
}
