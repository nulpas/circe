import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {invalid} from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit, OnDestroy {
  public readonly label: string;
  public input: FormControl = new FormControl('');
  public inputSize: FormControl = new FormControl(1);
  public inputIconRight: FormControl = new FormControl(1);
  public inputDisabled: FormControl = new FormControl(false);
  public inputLabel: FormControl = new FormControl(true);
  public inputHelperText: FormControl = new FormControl(true);

  public errorMessage: string = '';
  public helperText: string;

  private _sourceHelperText: string = 'This is helper text';
  private _componentDestroy$: Subject<undefined> = new Subject();

  constructor(private _renderer: Renderer2) {
    this.label = 'Label';
    this.helperText = this._getHelperText(this.inputIconRight.value);
    this._setValidators(this.inputIconRight.value);

    this.input.valueChanges.pipe(
      takeUntil(this._componentDestroy$)
    ).subscribe((value: string) => {
      this.errorMessage = '';
      if (this.inputIconRight.value === 1 && this.input.invalid) {
        this.errorMessage = 'Required field. Write something';
      }
      if (this.inputIconRight.value === 4 && this.input.invalid) {
        this.errorMessage = 'Introduce valid email';
      }
    });

    this.inputIconRight.valueChanges.pipe(
      takeUntil(this._componentDestroy$)
    ).subscribe((r: number) => {
      this.input.clearValidators();
      this.helperText = this._getHelperText(r);
      this._setValidators(r);
      this.input.setValue(this.input.value);
      console.log('IMPORTANT', this.input.valid);
      console.log(this.input.pristine, this.input.touched, this.input.invalid);
    });

    this.inputDisabled.valueChanges.pipe(
      takeUntil(this._componentDestroy$)
    ).subscribe((r: boolean) => {
      (r) ? this.input.disable({ emitEvent: false }) : this.input.enable({ emitEvent: false });
    });

    this.inputHelperText.valueChanges.pipe(
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

  private _getHelperText(iconRightValue: number): string {
    let _output: string = this._sourceHelperText;
    switch (iconRightValue) {
      case 1: _output = 'This is required field';
        break;
      case 4: _output = 'Try to write an email to check validation';
        break;
    }
    return _output;
  }

  private _setValidators(iconRightValue: number): void {
    this.input.clearValidators();
    switch (iconRightValue) {
      case 1: this.input.setValidators(Validators.required);
        break;
      case 4: this.input.setValidators(Validators.email);
        break;
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._componentDestroy$.next();
    this._componentDestroy$.complete();
    this._componentDestroy$.unsubscribe();
  }
}
