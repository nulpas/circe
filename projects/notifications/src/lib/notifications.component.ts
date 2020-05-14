import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges,
  OnDestroy, OnInit, Output, SimpleChanges
} from '@angular/core';
import {
  ItemTypeDefinition, notificationHorizontal, NotificationHorizontal, NotificationsConfig,
  notificationTypes, notificationVertical, NotificationVertical
} from './notifications.types';
import { BoxModelService, EventsService } from '@lunaeme/circe-core';
import { Subject } from 'rxjs';
import { NotificationsService } from './notifications.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'cc-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() hotRender: boolean = false;
  @Input() disabled: boolean = false;
  @Input() config: NotificationsConfig;

  @Output() closed: EventEmitter<undefined> = new EventEmitter();
  @Output() autoClose: EventEmitter<undefined> = new EventEmitter();

  public set triggerNotification(launch: boolean) {
    this._triggerNotification = launch;
    this._cd.markForCheck();
    if (launch) {
      setTimeout(() => {
        if (!this.disabled) {
          this._positioning();
        }
        this.showNotification = true;
        this._cd.markForCheck();
        if (!this.disabled) {
          this._visibilityDurationTimeout = setTimeout(() => {
            this.showNotification = false;
            this._cd.markForCheck();
          }, this._timeout);
        }
      });
    }
  }
  public get triggerNotification(): boolean {
    return this._triggerNotification;
  }
  public set showNotification(show: boolean) {
    this._showNotification = show;
    this._cd.markForCheck();
    if (!this._showNotification) {
      setTimeout(() => {
        this.triggerNotification = false;
        this._cd.markForCheck();
        this.autoClose.emit();
      }, 400);
    }
  }
  public get showNotification(): boolean {
    return this._showNotification;
  }

  public message: string;
  public type: ItemTypeDefinition;
  public closeControl: boolean;
  public icon: string;

  private _timeout: number;
  private _margin: number;

  private _configIsSet: boolean;
  private _elementReference: Element;
  private _elementReferenceRect: DOMRect;
  private _notificationElement: Element;
  private _notificationElementRect: DOMRect;

  private _vertical: NotificationVertical;
  private _horizontal: NotificationHorizontal;

  private _element: Element;
  private _triggerNotification: boolean;
  private _showNotification: boolean;
  private _visibilityDurationTimeout: NodeJS.Timeout;
  private _componentDestroyed$: Subject<undefined> = new Subject();

  constructor(
    public ev: EventsService,
    private _bm: BoxModelService,
    private _notifications: NotificationsService,
    private _cd: ChangeDetectorRef,
    private _el: ElementRef<Element>
  ) {
    this._element = _el.nativeElement;

    if (!this.disabled) {
      _notifications.trigger$.pipe(
        takeUntil(this._componentDestroyed$)
      ).subscribe((config: NotificationsConfig) => {
        this._processConfiguration(config);
        clearTimeout(this._visibilityDurationTimeout);
        this.triggerNotification = true;
      });
    }
  }

  private _positioning(): void {
    const _notificationElement: Element = this._element.getElementsByClassName('mda-notifications').item(0);
    if (!!_notificationElement) {
      this._notificationElement = _notificationElement;
      this._notificationElementRect = this._notificationElement.getBoundingClientRect();

      let _top: number;
      switch (this._vertical) {
        case notificationVertical.top:
          _top = this._elementReferenceRect.top + this._margin;
          break;
        case notificationVertical.center:
          const _height: number = (this._elementReferenceRect.height > window.innerHeight) ?
            window.innerHeight : this._elementReferenceRect.height;
          const _center: number = _height / 2;
          const _middleNot: number = this._notificationElementRect.height / 2;
          _top = this._elementReferenceRect.top + _center - _middleNot;
          break;
        case notificationVertical.bottom:
          const _heightForBottom: number = (this._elementReferenceRect.height > window.innerHeight) ?
            window.innerHeight : this._elementReferenceRect.height;
          _top = this._elementReferenceRect.top + _heightForBottom - this._notificationElementRect.height - this._margin;
          break;
      }

      let _left: number;
      switch (this._horizontal) {
        case notificationHorizontal.left:
          _left = this._elementReferenceRect.left + this._margin;
          break;
        case notificationHorizontal.center:
          const _width: number = (this._elementReferenceRect.width > window.innerWidth) ?
            window.innerWidth : this._elementReferenceRect.width;
          const _center: number = _width / 2;
          const _middleNot: number = this._notificationElementRect.width / 2;
          _left = this._elementReferenceRect.left + _center - _middleNot;
          break;
        case notificationHorizontal.right:
          const _widthForRight: number = (this._elementReferenceRect.width > window.innerWidth) ?
            window.innerWidth : this._elementReferenceRect.width;
          _left = this._elementReferenceRect.left + _widthForRight - this._notificationElementRect.width - this._margin;
      }

      (this._notificationElement as HTMLElement).style.left = `${_left}px`;
      (this._notificationElement as HTMLElement).style.top = `${_top}px`;
    }
  }

  private _processPosition(config: NotificationsConfig): void {
    if ((!!!this._vertical && !!!this._horizontal) || (this._configIsSet && config.updatePosition)) {
      this._vertical = 'top';
      this._horizontal = 'center';
      if (this._configIsSet && !!config.position) {
        const _positionArray: Array<string> = config.position.split(' ');
        if (_positionArray.length === 2) {
          this._vertical = _positionArray[0] as NotificationVertical;
          this._horizontal = _positionArray[1] as NotificationHorizontal;
        }
      }
    }
  }

  private _processReference(config: NotificationsConfig): void {
    if (!!!this._elementReference || (this._configIsSet && config.updateReference)) {
      this._elementReference = this._bm.getElement({ name: 'html', type: 'tag' });
      this._elementReferenceRect = this._elementReference.getBoundingClientRect();
      if (this._configIsSet && !!config.reference) {
        const _elementReference: Element = this._bm.getElement(config.reference);
        if (!!_elementReference) {
          this._elementReference = _elementReference;
          this._elementReferenceRect = this._elementReference.getBoundingClientRect();
        }
      }
    }
  }

  private _processConfiguration(config: NotificationsConfig = this.config): void {
    this._configIsSet = (!!config);

    this.message = '';
    if (this._configIsSet && !!config.message) {
      this.message = config.message;
    }

    this.type = notificationTypes.info;
    if (this._configIsSet && !!config.type) {
      this.type = notificationTypes[config.type];
    }

    this.closeControl = true;
    if (this._configIsSet && config.closeControl !== undefined) {
      this.closeControl = config.closeControl;
    }

    this.icon = this.type.defaultIcon;
    if (this._configIsSet && !!config.icon !== undefined) {
      if (typeof config.icon === 'boolean' && !config.icon) {
        this.icon = '';
      }
      if (typeof config.icon === 'string') {
        this.icon = config.icon;
      }
    }

    this._timeout = 6000;
    if (this._configIsSet && !!config.timeout) {
      this._timeout = config.timeout;
    }

    this._margin = 10;
    if (this._configIsSet && (!!config.margin || config.margin === 0)) {
      this._margin = config.margin;
    }

    if (this.disabled) {
      this.triggerNotification = true;
    } else {
      this._processReference(config);
      this._processPosition(config);
    }
  }

  ngOnInit(): void {
    this._processConfiguration();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.hotRender && !!changes) {
      if (!!changes.config && !!changes.config.currentValue) {
        this._processConfiguration();
      }
    }
  }

  public clickOnCloseControl(): void {
    if (!this.disabled) {
      clearTimeout(this._visibilityDurationTimeout);
      this.showNotification = false;
    }
    this.closed.emit();
  }

  ngOnDestroy() {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
    this._componentDestroyed$.unsubscribe();
  }
}
