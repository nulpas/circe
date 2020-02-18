import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent implements OnInit, OnDestroy {
  public render: boolean;
  public spinnerSize: FormControl = new FormControl(1);
  public spinnerDisplay: FormControl = new FormControl(1);
  public spinnerColor: FormControl = new FormControl(1);
  public spinnerBackground: FormControl = new FormControl(false);

  private _componentDestroyed$: Subject<undefined> = new Subject();

  constructor() {
    this.render = false;

    this.spinnerSize.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe(() => {
      this._renderComponent();
    });

    this.spinnerDisplay.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe(() => {
      this._renderComponent();
    });

    this.spinnerColor.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: number) => {
      this.spinnerBackground.setValue(true);
      (r === 2) ? this.spinnerBackground.disable() : this.spinnerBackground.enable();
      this._renderComponent();
    });
  }

  private _renderComponent(): void {
    this.render = true;
    setTimeout(() => {
      this.render = false;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
    this._componentDestroyed$.unsubscribe();
  }
}
