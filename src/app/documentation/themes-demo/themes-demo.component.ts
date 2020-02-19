import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-themes-demo',
  templateUrl: './themes-demo.component.html',
  styleUrls: ['./themes-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemesDemoComponent implements OnInit, OnDestroy {
  public themesDemoTemplate: FormControl = new FormControl(1);

  private _componentDestroyed$: Subject<undefined> = new Subject();

  constructor() {
    this.themesDemoTemplate.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe(() => {

    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
    this._componentDestroyed$.unsubscribe();
  }
}
