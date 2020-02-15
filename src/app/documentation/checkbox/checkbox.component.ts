import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { merge, Subject } from 'rxjs';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements OnInit, OnDestroy {
  public checkbox01: FormControl = new FormControl(false);
  public checkbox02: FormControl = new FormControl(false);
  public checkbox03: FormControl = new FormControl(false);
  public checkboxSelectAll: FormControl = new FormControl(false);
  public checkboxDistribution: FormControl = new FormControl(1);
  public checkboxTitleLabel: FormControl = new FormControl(true);
  public checkboxLabel: FormControl = new FormControl(true);
  public checkboxDisabled: FormControl = new FormControl(false);

  public checkAll: boolean = false;
  public checkNone: boolean = true;

  private _componentDestroy$: Subject<undefined> = new Subject();

  constructor() {
    merge(
      this.checkbox01.valueChanges,
      this.checkbox02.valueChanges,
      this.checkbox03.valueChanges
    ).pipe(
      takeUntil(this._componentDestroy$)
    ).subscribe(() => {
      const _arrayValues: Array<boolean> = [this.checkbox01.value, this.checkbox02.value, this.checkbox03.value];
      this.checkAll = _arrayValues.every((e: boolean) => !!e);
      this.checkNone = _arrayValues.every((e: boolean) => !e);
    });

    this.checkboxSelectAll.valueChanges.pipe(
      takeUntil(this._componentDestroy$)
    ).subscribe((r: boolean) => {
      this.checkAll = r;
      this.checkNone = !r;
      this.checkbox01.setValue(r, { emitEvent: false });
      this.checkbox02.setValue(r, { emitEvent: false });
      this.checkbox03.setValue(r, { emitEvent: false });
    });

    this.checkboxDisabled.valueChanges.pipe(
      takeUntil(this._componentDestroy$)
    ).subscribe((r: boolean) => {
      if (r) {
        this.checkboxSelectAll.disable({ emitEvent: false });
        this.checkbox01.disable({ emitEvent: false });
        this.checkbox02.disable({ emitEvent: false });
        this.checkbox03.disable({ emitEvent: false });
      } else {
        this.checkboxSelectAll.enable({ emitEvent: false });
        this.checkbox01.enable({ emitEvent: false });
        this.checkbox02.enable({ emitEvent: false });
        this.checkbox03.enable({ emitEvent: false });
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._componentDestroy$.next();
    this._componentDestroy$.complete();
    this._componentDestroy$.unsubscribe();
  }
}
