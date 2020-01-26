import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { BoxModelService } from '@lunaeme/circe-core';
import { takeUntil } from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';

@Directive({
  selector: '[ccGridColumns]'
})
export class GridColumnsDirective implements OnInit, OnDestroy {
  @Input() numberOfColumns: number;

  private readonly _element: HTMLElement;
  private _visible$: Subject<undefined> = new Subject();

  private _directiveDestroyed$: Subject<undefined> = new Subject();

  constructor(private _el: ElementRef, private _renderer: Renderer2, private _bm: BoxModelService) {
    this._element = _el.nativeElement;

    fromEvent(window, 'resize').pipe(
      takeUntil(this._directiveDestroyed$)
    ).subscribe( () => {
      this._element.style.visibility = 'hidden';
      setTimeout(() => {
        this._composeGrid();
      }, 500);
    });

    this._visible$.pipe(
      takeUntil(this._directiveDestroyed$)
    ).subscribe(() => {
      this._element.style.visibility = 'visible';
    });
  }

  private _composeGrid(): void {
    const _elementRect: ClientRect | DOMRect = this._element.getBoundingClientRect();
    const _boxSpacing: number = Math.round(_elementRect.width * 0.1 / this.numberOfColumns * 0.5);
    const _elementsRectSet: Array<ClientRect | DOMRect> = [];

    setTimeout(() => {
      const _domSet: Array<HTMLElement> = Array.from(this._element.children) as Array<HTMLElement>;

      for (let i: number = 0; i < _domSet.length; i++) {
        _domSet[i].style.position = 'absolute';
        _domSet[i].style.boxSizing = 'border-box';
        _domSet[i].style.width = `${(100 - 10) / this.numberOfColumns}%`;

        if (i) {
          if ((i - this.numberOfColumns) >= 0) {
            if (i % this.numberOfColumns) {
              _domSet[i].style.left = `${_elementsRectSet[i - 1].right - _elementRect.left + _boxSpacing}px`;
            }
          } else {
            _domSet[i].style.left = `${_elementsRectSet[i - 1].right - _elementRect.left + _boxSpacing}px`;
          }
        }

        _elementsRectSet.push(_domSet[i].getBoundingClientRect());
      }

      setTimeout(() => {
        for (let i: number = 0; i < _domSet.length; i++) {
          _elementsRectSet[i] = _domSet[i].getBoundingClientRect();

          if (i) {
            if ((i - this.numberOfColumns) >= 0) {
              const _rectReference: ClientRect | DOMRect = _elementsRectSet[i - this.numberOfColumns];

              if (!(i % this.numberOfColumns)) {
                _domSet[i].style.top = `${_rectReference.bottom - _elementRect.top + _boxSpacing}px`;
              } else {
                _domSet[i].style.top = `${_rectReference.bottom - _elementRect.top + _boxSpacing}px`;
              }

              _domSet[i].style.marginBottom = `${_boxSpacing}px`;
            }
          }

          _elementsRectSet[i] = _domSet[i].getBoundingClientRect();
        }

        this._visible$.next();
      });
    });
  }

  ngOnInit(): void {
    this._element.style.visibility = 'hidden';
    this._element.style.position = 'relative';
    this._element.style.boxSizing = 'border-box';
    this._composeGrid();
  }

  ngOnDestroy(): void {
    this._directiveDestroyed$.next();
    this._directiveDestroyed$.complete();
    this._directiveDestroyed$.unsubscribe();
  }
}
