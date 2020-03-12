import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { EventsService } from '@core/events/events.service';
import {debounceTime, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit, OnDestroy {
  public buttonText: FormControl = new FormControl('Cool Button');
  public buttonSize: FormControl = new FormControl(1);
  public buttonType: FormControl = new FormControl(1);
  public buttonDisabled: FormControl = new FormControl(false);
  public buttonIcon: FormControl = new FormControl(false);
  public buttonIconType: FormControl = new FormControl(1);
  public buttonSpinner: FormControl = new FormControl(false);

  public showSpinner: boolean;
  public render: boolean;
  public marquee: string;

  private _mockedCall: Subject<boolean> = new Subject();
  private _componentDestroyed$: Subject<undefined> = new Subject();

  constructor(public ev: EventsService, private _cd: ChangeDetectorRef, private _renderer: Renderer2) {
    this.showSpinner = false;
    this.render = false;
    this.marquee = 'Press to trigger an action with loading spinner';

    this.buttonDisabled.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: boolean) => {
      (r) ? this.buttonSpinner.disable({ emitEvent: false }) : this.buttonSpinner.enable({ emitEvent: false });
    });

    this.buttonIcon.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: boolean) => {
      (r && this.buttonIconType.value === 3) ? this.buttonText.disable() : this.buttonText.enable();
    });

    this.buttonSpinner.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: boolean) => {
      (r) ? this.buttonDisabled.disable({ emitEvent: false }) : this.buttonDisabled.enable({ emitEvent: false });
    });

    this.buttonIconType.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: number) => {
      (r === 3) ? this.buttonText.disable() : this.buttonText.enable();
    });

    this._mockedCall.pipe(
      debounceTime(4000),
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: boolean) => {
      this.showSpinner = r;
      this._whileCalling(r);
      this.marquee = 'Press to trigger an action with loading spinner';
      _cd.markForCheck();
    });
  }

  private _renderComponent(): void {
    this.render = true;
    setTimeout(() => {
      this.render = false;
    });
  }

  private _whileCalling(disabledSwitch: boolean) {
    if (disabledSwitch) {
      this.buttonSize.disable({ emitEvent: false });
      this.buttonText.disable({ emitEvent: false });
      this.buttonType.disable({ emitEvent: false });
      this.buttonDisabled.disable({ emitEvent: false });
      this.buttonIcon.disable({ emitEvent: false });
      this.buttonIconType.disable({ emitEvent: false });
      this.buttonSpinner.disable({ emitEvent: false });
    } else {
      this.buttonSize.enable();
      this.buttonText.enable();
      this.buttonType.enable();
      this.buttonDisabled.enable();
      this.buttonIcon.enable();
      this.buttonIconType.enable();
      this.buttonSpinner.enable();
    }
  }

  ngOnInit(): void {}

  public buttonAction() {
    if (this.buttonSpinner.value && !this.showSpinner) {
      this.showSpinner = true;
      this._whileCalling(true);
      this._renderComponent();
      this.marquee = 'Loading ...';
      this._mockedCall.next(false);
    }
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
    this._componentDestroyed$.unsubscribe();
  }
}
