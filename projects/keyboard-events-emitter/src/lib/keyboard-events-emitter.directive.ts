import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { EventsService } from '@lunaeme/circe-core';

@Directive({
  selector: '[ccKeyboardEventsEmitter]'
})
export class KeyboardEventsEmitterDirective implements OnInit, OnDestroy {
  @Input() keysToEmit: Array<string> = [];
  @Input() keysToSpecialAction: Array<string> = [];
  @Input() keyEmitDisabled: boolean = false;
  @Output() keyboardEvent: EventEmitter<KeyboardEvent> = new EventEmitter();
  @Output() specialAction: EventEmitter<undefined> = new EventEmitter();

  private readonly _element: HTMLElement;
  private readonly _specialActionsKeysException: Array<string>;
  private readonly _specialActionsTagsException: Array<string>;

  constructor(private _ev: EventsService, private _el: ElementRef<HTMLElement>, private _renderer: Renderer2) {
    this._element = _el.nativeElement;
    this._specialActionsKeysException = [' '];
    this._specialActionsTagsException = ['input'];
  }

  @HostListener('keydown', ['$event']) onKeydownHandler(event: KeyboardEvent): void {
    this._ev.preventNeededEvent(event);
    if (!this.keyEmitDisabled) {
      let _isKeyException: boolean;
      let _isTagException: boolean;
      if (this.keysToEmit.length) {
        if (this.keysToEmit.includes(event.key)) {
          this.keyboardEvent.emit(event);
          if (this.keysToSpecialAction.includes(event.key)) {
            _isKeyException = this._specialActionsKeysException.includes(event.key);
            _isTagException = this._specialActionsTagsException.includes((event.target as Element).tagName.toLowerCase());
            if (!_isKeyException || !_isTagException) {
              this._ev.preventNoNeededEvent(event);
            }
            this.specialAction.emit();
          }
        }
      } else {
        this.keyboardEvent.emit(event);
        if (this.keysToSpecialAction.includes(event.key)) {
          _isKeyException = this._specialActionsKeysException.includes(event.key);
          _isTagException = this._specialActionsTagsException.includes((event.target as Element).tagName.toLowerCase());
          if (!_isKeyException || !_isTagException) {
            this._ev.preventNoNeededEvent(event);
          }
          this.specialAction.emit();
        }
      }
    }
  }

  ngOnInit(): void {
    this._renderer.setAttribute(this._element, 'tabindex', '1');
  }

  ngOnDestroy(): void {
    this._renderer.removeAttribute(this._element, 'tabindex');
  }
}
