import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { EventsService } from '@lunaeme/circe-core';

@Directive({
  selector: '[ccClickOutside]'
})

export class ClickOutsideDirective {
  @Input() apply: boolean = true;
  @Input() exceptions: Array<string> = [];
  @Output() clickOutside: EventEmitter<undefined> = new EventEmitter();

  private readonly _element: HTMLElement;

  @HostListener('document:click', ['$event']) onMouseEnter(event: Event) {
    if (this.apply) {
      this._ev.preventNoNeededEvent(event);
      const _eventTarget: HTMLElement = event.target as HTMLElement;
      if (!this._element.contains(_eventTarget) && (this.exceptions.indexOf(_eventTarget.id) < 0)) {
        this.clickOutside.emit();
      }
    }
  }

  constructor(private _el: ElementRef, private _ev: EventsService) {
    this._element = this._el.nativeElement;
  }
}
