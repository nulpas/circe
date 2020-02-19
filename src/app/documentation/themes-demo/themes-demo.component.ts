import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-themes-demo',
  templateUrl: './themes-demo.component.html',
  styleUrls: ['./themes-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemesDemoComponent implements OnInit, OnDestroy {
  public themesDemoTemplate: FormControl = new FormControl(undefined);

  private readonly _bodyElement: HTMLBodyElement;
  private _componentDestroyed$: Subject<undefined> = new Subject();

  constructor(private _renderer: Renderer2) {
    this._bodyElement = document.getElementsByTagName('body').item(0);
    this.themesDemoTemplate.setValue(this._checkTemplate());

    this.themesDemoTemplate.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: number) => {
      if (r === 1) {
        _renderer.removeClass(this._bodyElement, 'mda-ey-tpl');
        _renderer.addClass(this._bodyElement, 'medea-tpl');
      } else if (r === 2) {
        _renderer.removeClass(this._bodyElement, 'medea-tpl');
        _renderer.addClass(this._bodyElement, 'mda-ey-tpl');
      }
    });
  }

  private _checkTemplate(): number {
    const _classList: DOMTokenList = this._bodyElement.classList;
    if (_classList.contains('mda-ey-tpl')) {
      return 2;
    }
    return 1;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
    this._componentDestroyed$.unsubscribe();
  }
}
