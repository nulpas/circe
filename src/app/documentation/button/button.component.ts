import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

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

  private _componentDestroyed$: Subject<undefined> = new Subject();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
    this._componentDestroyed$.unsubscribe();
  }
}
