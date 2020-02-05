import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioComponent implements OnInit, OnDestroy {
  public radio: FormControl = new FormControl('');
  public radioDistribution: FormControl = new FormControl(1);
  public radioTitleLabel: FormControl = new FormControl(true);
  public radioLabel: FormControl = new FormControl(true);
  public radioDisabled: FormControl = new FormControl(false);

  private _componentDestroy$: Subject<undefined> = new Subject();

  constructor() {
    this.radioDisabled.valueChanges.pipe(
      takeUntil(this._componentDestroy$)
    ).subscribe((r: boolean) => {
      (r) ? this.radio.disable({ emitEvent: false }) : this.radio.enable({ emitEvent: false });
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
