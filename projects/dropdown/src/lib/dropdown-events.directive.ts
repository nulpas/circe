import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { EventsService } from '@lunaeme/circe-core';

@Directive({
  selector: '[ccDropdownEvents]'
})
export class DropdownEventsDirective {
  @Input() showDropdown: boolean;
  @Input() dropdownActionsDisabled: boolean = false;
  @Output() showDropdownChange: EventEmitter<boolean> = new EventEmitter();
  @Output() clickEvent: EventEmitter<undefined> = new EventEmitter();
  @Output() blurEvent: EventEmitter<undefined> = new EventEmitter();

  constructor(private _ev: EventsService) {}

  @HostListener('click', ['$event']) onClickHandler(event: MouseEvent): void {
    this._ev.preventNoNeededEvent(event);
    if (!this.dropdownActionsDisabled) {
      this.showDropdownChange.emit(!this.showDropdown);
      this.clickEvent.emit();
    }
  }

  @HostListener('blur', ['$event']) onBlurHandler(event: FocusEvent): void {
    this._ev.preventNoNeededEvent(event);
    if (!this.dropdownActionsDisabled) {
      this.showDropdownChange.emit(false);
      this.blurEvent.emit();
    }
  }
}
