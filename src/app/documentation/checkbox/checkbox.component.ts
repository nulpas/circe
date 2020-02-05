import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements OnInit, OnDestroy {
  public checkbox: FormControl = new FormControl(false);
  public checkboxDistribution: FormControl = new FormControl(1);
  public checkboxTitleLabel: FormControl = new FormControl(true);
  public checkboxLabel: FormControl = new FormControl(true);
  public checkboxDisabled: FormControl = new FormControl(false);

  private _componentDestroy$: Subject<undefined> = new Subject();

  constructor() {
    this.checkboxDisabled.valueChanges.pipe(
      takeUntil(this._componentDestroy$)
    ).subscribe((r: boolean) => {
      (r) ? this.checkbox.disable({ emitEvent: false }) : this.checkbox.enable({ emitEvent: false });
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._componentDestroy$.next();
    this._componentDestroy$.complete();
    this._componentDestroy$.unsubscribe();
  }
}
