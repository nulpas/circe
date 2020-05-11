import {
  Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges,
  OnDestroy, OnInit, Output, Renderer2, SimpleChanges
} from '@angular/core';
import { EventsService, ToolService } from '@lunaeme/circe-core';
import { KeyboardEventsEmitterConfig, keyEventsAvailable, KeyEventsAvailable } from './keyboard-events-emitter.types';

interface AllKeyEvents {
  keydown: 'keydown';
  keyup: 'keyup';
  keypress: 'keypress';
  globalKeydown: 'document:keydown';
  globalKeyup: 'document:keyup';
  globalKeypress: 'document:keypress';
}

@Directive({
  selector: '[ccKeyboardEventsEmitter]'
})
export class KeyboardEventsEmitterDirective implements OnInit, OnChanges, OnDestroy {
  @Input() config: KeyboardEventsEmitterConfig;
  @Input() disabled: boolean = false;
  @Output() keyDown: EventEmitter<KeyboardEvent> = new EventEmitter();
  @Output() keyUp: EventEmitter<KeyboardEvent> = new EventEmitter();
  @Output() keyPress: EventEmitter<KeyboardEvent> = new EventEmitter();
  @Output() specialAction: EventEmitter<undefined> = new EventEmitter();

  private _eventsToEmit: Array<string>;
  private _scope: string;
  private _keysToEmit: Array<string>;
  private _keysToSpecialAction: Array<string>;

  private _element: HTMLElement;
  private _configIsSet: boolean;
  private _eventsToEmitIsSet: boolean;
  private _keysToEmitIsSet: boolean;
  private _keysToSpecialActionIsSet: boolean;
  private _keysEmitScopeIsSet: boolean;

  private readonly _allEvents: AllKeyEvents;

  constructor(
    private _ev: EventsService,
    private _el: ElementRef<HTMLElement>,
    private _renderer: Renderer2
  ) {
    this._element = _el.nativeElement;
    this._allEvents = {
      keydown: 'keydown',
      keyup: 'keyup',
      keypress: 'keypress',
      globalKeydown: 'document:keydown',
      globalKeyup: 'document:keyup',
      globalKeypress: 'document:keypress'
    };
  }

  @HostBinding('attr.tabindex') get valid() { return (!this.disabled) ? 1 : undefined; }

  @HostListener('keydown', ['$event']) onKeydownHandler(event: KeyboardEvent): void {
    this._ev.preventNeededEvent(event);
    if (this._eventsToEmit.includes(this._allEvents.keydown)) {
      console.log('KEYDOWN');
    }
  }

  @HostListener('keyup', ['$event']) onKeyUpHandler(event: KeyboardEvent): void {
    this._ev.preventNeededEvent(event);
    if (this._eventsToEmit.includes(this._allEvents.keyup)) {
      console.log('KEYUP');
    }
  }

  @HostListener('keypress', ['$event']) onKeyPressHandler(event: KeyboardEvent): void {
    this._ev.preventNeededEvent(event);
    if (this._eventsToEmit.includes(this._allEvents.keypress)) {
      console.log('KEYPRESS');
    }
  }

  @HostListener('document:keydown', ['$event']) onGlobalKeydownHandler(event: KeyboardEvent): void {
    this._ev.preventNeededEvent(event);
    if (this._eventsToEmit.includes(this._allEvents.globalKeydown)) {
      console.log('GLOBAL KEYDOWN');
    }
  }

  @HostListener('document:keyup', ['$event']) onGlobalKeyUpHandler(event: KeyboardEvent): void {
    this._ev.preventNeededEvent(event);
    if (this._eventsToEmit.includes(this._allEvents.globalKeyup)) {
      console.log('GLOBAL KEYUP');
    }
  }

  @HostListener('document:keypress', ['$event']) onGlobalKeyPressHandler(event: KeyboardEvent): void {
    this._ev.preventNeededEvent(event);
    if (this._eventsToEmit.includes(this._allEvents.globalKeypress)) {
      console.log('GLOBAL KEYPRESS');
    }
  }

  private _setEventsToEmit(): void {
    if (!this.disabled) {
      if (this._keysEmitScopeIsSet && this.config.keysEmitScope === 'global') {
        this._scope = 'document:';
      }
      if (this._eventsToEmitIsSet) {
        this._eventsToEmit = this.config.eventsToEmit
          .filter((e: KeyEventsAvailable) => keyEventsAvailable.includes(e))
          .map((e: KeyEventsAvailable) => `${this._scope}${e}`);
      }
    }
  }

  private _setKeys(): void {
    if (!this.disabled) {
      if (this._keysToEmitIsSet) {
        this._keysToEmit = this.config.keysToEmit;
      }
      if (this._keysToSpecialActionIsSet) {
        this._keysToSpecialAction = this.config.keysToSpecialAction;
      }
    }
  }

  ngOnInit(): void {
    this._configIsSet = (!!this.config);
    this._eventsToEmitIsSet = this._configIsSet && ToolService.checkArray(this.config.eventsToEmit);
    this._keysToEmitIsSet = this._configIsSet && ToolService.checkArray(this.config.keysToEmit);
    this._keysToSpecialActionIsSet = this._configIsSet && ToolService.checkArray(this.config.keysToSpecialAction);
    this._keysEmitScopeIsSet = this._configIsSet && !!this.config.keysEmitScope;

    this._scope = '';
    this._eventsToEmit = keyEventsAvailable;
    this._keysToEmit = [];
    this._keysToSpecialAction = [];

    this._setEventsToEmit();
    this._setKeys();
    // this._renderer.setAttribute(this._element, 'tabindex', '1');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes && typeof changes.disabled === 'boolean') {
      this._setEventsToEmit();
      this._setKeys();
    }
  }

  ngOnDestroy(): void {
    // this._renderer.removeAttribute(this._element, 'tabindex');
  }
}
