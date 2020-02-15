import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchComponent implements OnInit, OnDestroy {
  public switch01: FormControl = new FormControl(false);
  public switch02: FormControl = new FormControl(false);
  public switchPosition: FormControl = new FormControl(1);
  public switchDistribution: FormControl = new FormControl(1);
  public switchTitleLabel: FormControl = new FormControl(true);
  public switchLabel: FormControl = new FormControl(true);
  public switchDisabled: FormControl = new FormControl(false);

  private _componentDestroyed$: Subject<undefined> = new Subject();

  constructor() {
    this.switchDisabled.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: boolean) => {
      if (r) {
        this.switch01.disable({ emitEvent: false });
        this.switch02.disable({ emitEvent: false });
      } else {
        this.switch01.enable({ emitEvent: false });
        this.switch02.enable({ emitEvent: false });
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
    this._componentDestroyed$.unsubscribe();
  }
}
