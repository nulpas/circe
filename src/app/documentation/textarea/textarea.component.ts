import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent implements OnInit, OnDestroy {
  public readonly label: string;
  public textarea: FormControl = new FormControl('');
  public textareaSize: FormControl = new FormControl(1);
  public textareaDisabled: FormControl = new FormControl(false);
  public textareaLabel: FormControl = new FormControl(true);
  public textareaRequired: FormControl = new FormControl(false);
  public textareaHelperText: FormControl = new FormControl(true);

  public errorMessage: string = '';
  public helperText: string;

  private _componentDestroy$: Subject<undefined> = new Subject();

  constructor(private _renderer: Renderer2) {
    this.label = 'Label';
    this.helperText = 'This is a helper text';

    this.textarea.valueChanges.pipe(
      takeUntil(this._componentDestroy$)
    ).subscribe((value: string) => {
      this.errorMessage = '';
      if (this.textarea.invalid) {
        this.errorMessage = 'Required field. Write something.';
      }
    });

    this.textareaDisabled.valueChanges.pipe(
      takeUntil(this._componentDestroy$)
    ).subscribe((r: boolean) => {
      (r) ? this.textarea.disable({ emitEvent: false }) : this.textarea.enable({ emitEvent: false });
    });

    this.textareaRequired.valueChanges.pipe(
      takeUntil(this._componentDestroy$)
    ).subscribe((r: boolean) => {
      this.textarea.clearValidators();
      if (r) {
        this.textarea.setValidators([Validators.required]);
      } else {
        this.textarea.setValue(this.textarea.value);
      }
    });

    this.textareaHelperText.valueChanges.pipe(
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
