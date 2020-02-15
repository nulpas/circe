import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit, OnDestroy {
  public readonly label: string;
  public select: FormControl = new FormControl('');
  public selectType: FormControl = new FormControl(1);
  public selectMode: FormControl = new FormControl(1);
  public selectSize: FormControl = new FormControl(1);
  public selectDisabled: FormControl = new FormControl(false);
  public selectLabel: FormControl = new FormControl(true);
  public selectHelperText: FormControl = new FormControl(true);
  public selectRequired: FormControl = new FormControl(false);

  public errorMessage: string = '';
  public helperText: string;

  private _componentDestroy$: Subject<undefined> = new Subject();

  constructor(private _renderer: Renderer2) {
    this.label = 'Label';
    this.helperText = 'This is helper text';

    this.selectType.disable({ emitEvent: false });

    this.select.valueChanges.pipe(
      takeUntil(this._componentDestroy$)
    ).subscribe(() => {
      this.errorMessage = '';
      if (this.select.invalid && this.select.dirty) {
        this.errorMessage = 'Required field. Write something';
      }
    });

    this.selectRequired.valueChanges.pipe(
      takeUntil(this._componentDestroy$)
    ).subscribe((r: boolean) => {
      this.select.clearValidators();
      if (r) {
        this.select.setValidators([Validators.required]);
        this.select.setValue('');
      } else {
        this.select.setValue(this.select.value);
      }
    });

    this.selectDisabled.valueChanges.pipe(
      takeUntil(this._componentDestroy$)
    ).subscribe((r: boolean) => {
      (r) ? this.select.disable({ emitEvent: false }) : this.select.enable({ emitEvent: false });
    });

    this.selectHelperText.valueChanges.pipe(
      takeUntil(this._componentDestroy$)
    ).subscribe((r: boolean) => {
      const _reportElement: HTMLElement = document.getElementsByClassName('mda-report').item(0) as HTMLElement;
      if (_reportElement) {
        (r) ?
          _renderer.removeStyle(_reportElement, 'visibility') :
          _renderer.setStyle(_reportElement, 'visibility', 'hidden');
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
