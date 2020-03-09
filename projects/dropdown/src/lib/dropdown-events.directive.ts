import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import { EventsService } from '@lunaeme/circe-core';

@Directive({
  selector: '[ccDropdownEvents]'
})
export class DropdownEventsDirective implements OnInit, OnDestroy {
  @Input() showDropdown: boolean;
  @Input() dropdownActionsDisabled: boolean = false;
  @Input() showOnClick: boolean = true;
  @Input() showOnFocus: boolean = false;
  @Output() showDropdownChange: EventEmitter<boolean> = new EventEmitter();
  @Output() clickEvent: EventEmitter<undefined> = new EventEmitter();
  @Output() focusEvent: EventEmitter<undefined> = new EventEmitter();
  @Output() blurEvent: EventEmitter<undefined> = new EventEmitter();

  private readonly _host: HTMLElement;

  constructor(private _ev: EventsService, private _el: ElementRef<HTMLElement>, private _renderer: Renderer2) {
    this._host = _el.nativeElement;
  }

  @HostListener('click', ['$event']) onClickHandler(event: MouseEvent): void {
    this._ev.preventNoNeededEvent(event);
    if (this.showOnClick && !this.dropdownActionsDisabled) {
      this.showDropdownChange.emit(!this.showDropdown);
      this.clickEvent.emit();
    }
  }

  @HostListener('focus', ['$event']) onFocusHandler(event: MouseEvent): void {
    this._ev.preventNoNeededEvent(event);
    if (this.showOnFocus && !this.dropdownActionsDisabled) {
      this.showDropdownChange.emit(!this.showDropdown);
      this.focusEvent.emit();
    }
  }

  @HostListener('blur', ['$event']) onBlurHandler(event: FocusEvent): void {
    this._ev.preventNoNeededEvent(event);
    if (!this.dropdownActionsDisabled) {
      this.showDropdownChange.emit(false);
      this.blurEvent.emit();
    }
  }

  ngOnInit(): void {
    if (!this._host.getAttribute('tabindex')) {
      this._renderer.setAttribute(this._host, 'tabindex', '0');
    }
    this.showOnClick = (this.showOnClick && !this.showOnFocus);
  }

  ngOnDestroy(): void {
    if (this._host.getAttribute('tabindex')) {
      this._renderer.removeAttribute(this._host, 'tabindex');
    }
  }
}
