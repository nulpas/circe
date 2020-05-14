import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {
  NotificationPosition, NotificationPositionDefinition,
  notificationPositions,
  NotificationsConfig,
  NotificationType,
  notificationTypes
} from '@notifications/notifications.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventsService } from '@core/events/events.service';
import { NotificationsService } from '@notifications/notifications.service';
import { ElementDefinitionComplex } from '@core/_types/element.types';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class NotificationsComponent implements OnInit, OnDestroy {
  public notificationsConfig: NotificationsConfig;

  public notificationPositions: NotificationPositionDefinition = notificationPositions;

  public notificationsType: FormControl = new FormControl(1);
  public notificationText: FormControl = new FormControl('Notification message.');
  public notificationsCloseControl: FormControl = new FormControl(true);
  public notificationsIcon: FormControl = new FormControl(1);
  public notificationsCustomIconExamples: FormControl = new FormControl();
  public notificationsPositionForm: FormControl = new FormControl(notificationPositions.topCenter);
  public notificationsReference: FormControl = new FormControl(1);
  public notificationsTimeout: FormControl = new FormControl(6000, [Validators.min(0)]);
  public notificationsMargin: FormControl = new FormControl(10, [Validators.min(0)]);

  public set marquee(phrase: string) {
    this._marquee = phrase;
    if (!!phrase) {
      setTimeout(() => {
        this.showMarquee = true;
        this._cd.markForCheck();
        setTimeout(() => {
          this.showMarquee = false;
          this._cd.markForCheck();
        }, 2000);
      });
    }
  }
  public get marquee(): string {
    return this._marquee;
  }
  public set showMarquee(show: boolean) {
    this._showMarquee = show;
    if (!this._showMarquee) {
      setTimeout(() => {
        this.marquee = '';
        this._cd.markForCheck();
      }, 600);
    }
  }
  public get showMarquee(): boolean {
    return this._showMarquee;
  }

  public set timeoutMarquee(value: boolean) {
    this._timeoutMarquee = value;
    if (!!value) {
      setTimeout(() => {
        this.showTimeoutMarquee = true;
        this._cd.markForCheck();
        setTimeout(() => {
          this.showTimeoutMarquee = false;
          this._cd.markForCheck();
        }, 2000);
      });
    }
  }
  public get timeoutMarquee(): boolean {
    return this._timeoutMarquee;
  }
  public set showTimeoutMarquee(show: boolean) {
    this._showTimeoutMarquee = show;
    if (!show) {
      setTimeout(() => {
        this.timeoutMarquee = false;
        this._cd.markForCheck();
      }, 600);
    }
  }
  public get showTimeoutMarquee(): boolean {
    return this._showTimeoutMarquee;
  }

  public set marginMarquee(value: boolean) {
    this._marginMarquee = value;
    if (!!value) {
      setTimeout(() => {
        this.showMarginMarquee = true;
        this._cd.markForCheck();
        setTimeout(() => {
          this.showMarginMarquee = false;
          this._cd.markForCheck();
        }, 2000);
      });
    }
  }
  public get marginMarquee(): boolean {
    return this._marginMarquee;
  }
  public set showMarginMarquee(show: boolean) {
    this._showMarginMarquee = show;
    if (!show) {
      setTimeout(() => {
        this.marginMarquee = false;
        this._cd.markForCheck();
      }, 600);
    }
  }
  public get showMarginMarquee(): boolean {
    return this._showMarginMarquee;
  }

  public timeoutReport: string;
  public timeoutError: string;
  public marginReport: string;
  public marginError: string;

  private _marquee: string;
  private _showMarquee: boolean;
  private _timeoutMarquee: boolean;
  private _showTimeoutMarquee: boolean;
  private _marginMarquee: boolean;
  private _showMarginMarquee: boolean;
  private _componentDestroyed$: Subject<undefined> = new Subject();

  constructor(
    public ev: EventsService,
    private _cd: ChangeDetectorRef,
    private _notifications: NotificationsService
  ) {
    this.notificationsConfig = {
      message: this.notificationText.value,
      reference: { name: 'main', type: 'tag' }
    };
    this.timeoutReport = 'Write timeout in ms and press enter.';
    this.marginReport = 'Write margin in px and press enter.';

    this.notificationsType.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((typeCode: number) => {
      let type: NotificationType = notificationTypes.default.type;
      switch (typeCode) {
        case 2:
          type = notificationTypes.success.type;
          break;
        case 3:
          type = notificationTypes.warning.type;
          break;
        case 4:
          type = notificationTypes.critical.type;
          break;
      }
      this.notificationsConfig = { ...this.notificationsConfig, type };
    });

    this.notificationText.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((message: string) => {
      this.notificationsConfig = { ...this.notificationsConfig, message };
    });

    this.notificationsCloseControl.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((closeControl: boolean) => {
      this.notificationsConfig = { ...this.notificationsConfig, closeControl };
    });

    this.notificationsIcon.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((iconChoice: number) => {
      if (iconChoice === 1 || iconChoice === 3) {
        const icon: boolean = (iconChoice === 1);
        this.notificationsConfig = { ...this.notificationsConfig, icon };
      } else {
        this.notificationsCustomIconExamples.setValue(1);
      }
    });

    this.notificationsCustomIconExamples.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((exampleNumber: number) => {
      const _customExamples: Array<string> = ['icon-mute', 'icon-plane', 'icon-cog', 'icon-user-x'];
      this.notificationsConfig = { ...this.notificationsConfig, icon: _customExamples[exampleNumber - 1] };
    });

    this.notificationsPositionForm.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((position: NotificationPosition) => {
      this.notificationsConfig = { ...this.notificationsConfig, position, updatePosition: true };
    });

    this.notificationsReference.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((option: number) => {
      let reference: ElementDefinitionComplex = { name: 'main', type: 'tag' };
      if (option === 2 || option === 3) {
        reference = (option === 2) ? { name: 'documentation-content', type: 'class' } : undefined;
      }
      this.notificationsConfig = { ...this.notificationsConfig, reference, updateReference: true };
    });

    this.notificationsTimeout.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe(() => {
      this.timeoutError = '';
      if (this.notificationsTimeout.invalid) {
        this.timeoutError = 'No negative values.'
      }
    });

    this.notificationsMargin.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe(() => {
      this.timeoutError = '';
      if (this.notificationsMargin.invalid) {
        this.marginError = 'No negative values.'
      }
    });
  }

  ngOnInit(): void {}

  public closeClicked(): void {
    this.marquee = 'Close control pressed...'
  }

  public triggerNotification() {
    this.notificationsType.disable({ emitEvent: false });
    this.notificationText.disable({ emitEvent: false });
    this.notificationsCloseControl.disable({ emitEvent: false });
    this.notificationsIcon.disable({ emitEvent: false });
    this.notificationsCustomIconExamples.disable({ emitEvent: false });
    this.notificationsPositionForm.disable({ emitEvent: false });
    this.notificationsReference.disable({ emitEvent: false });
    this.notificationsTimeout.disable({ emitEvent: false });
    this.notificationsMargin.disable({ emitEvent: false });

    this._notifications.trigger$.next(this.notificationsConfig);
  }

  public closedItself() {
    this.notificationsType.enable({ emitEvent: false });
    this.notificationText.enable({ emitEvent: false });
    this.notificationsCloseControl.enable({ emitEvent: false });
    this.notificationsIcon.enable({ emitEvent: false });
    this.notificationsCustomIconExamples.enable({ emitEvent: false });
    this.notificationsPositionForm.enable({ emitEvent: false });
    this.notificationsReference.enable({ emitEvent: false });
    this.notificationsTimeout.enable({ emitEvent: false });
    this.notificationsMargin.enable({ emitEvent: false });
  }

  public timeoutKeyPress(event: KeyboardEvent) {
    this.ev.preventNeededEvent(event);
    if (event.key === 'Enter' && this.notificationsTimeout.valid) {
      this.notificationsConfig = { ...this.notificationsConfig, timeout: this.notificationsTimeout.value };
      this.timeoutMarquee = true;
    }
  }

  public marginKeyPress(event: KeyboardEvent) {
    this.ev.preventNeededEvent(event);
    if (event.key === 'Enter' && this.notificationsMargin.valid) {
      this.notificationsConfig = { ...this.notificationsConfig, margin: this.notificationsMargin.value };
      this.marginMarquee = true;
    }
  }

  ngOnDestroy() {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
    this._componentDestroyed$.unsubscribe();
  }
}
