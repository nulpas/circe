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

  private readonly _htmlElement: HTMLHtmlElement;
  private SPACE_BLUE_TEMPLATE: string = 'medea-tpl';
  private STRATIO_WEB_TEMPLATE: string = 'mda-stratio-web-tpl';
  private MARTINA_TEMPLATE: string = 'mda-martina-tpl';
  private _componentDestroyed$: Subject<undefined> = new Subject();

  constructor(private _renderer: Renderer2) {
    this._htmlElement = document.getElementsByTagName('html').item(0);
    this.themesDemoTemplate.setValue(this._checkTemplate());

    this.themesDemoTemplate.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: number) => {
      _renderer.removeAttribute(this._htmlElement, 'class');
      switch (r) {
        case 1:
          _renderer.addClass(this._htmlElement, this.SPACE_BLUE_TEMPLATE);
          break;
        case 2:
          _renderer.addClass(this._htmlElement, this.STRATIO_WEB_TEMPLATE);
          break;
        case 3:
          _renderer.addClass(this._htmlElement, this.MARTINA_TEMPLATE);
          break;
      }
    });
  }

  private _checkTemplate(): number {
    const _classList: DOMTokenList = this._htmlElement.classList;
    if (_classList.contains(this.STRATIO_WEB_TEMPLATE)) {
      return 2;
    } else if (_classList.contains(this.MARTINA_TEMPLATE)) {
      return 3;
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
