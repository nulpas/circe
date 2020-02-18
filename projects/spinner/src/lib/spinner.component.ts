import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { SpinnerType } from './spinner.types';

@Component({
  selector: 'cc-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SpinnerComponent implements OnInit, OnDestroy {
  @Input() type: SpinnerType;
  @Input() class: string;
  @Input()
  set render(render: boolean) {
    if (render) {
      setTimeout(() => {
        const _spinner: HTMLElement = this._element.getElementsByClassName('mda-spinner').item(0) as HTMLElement;
        for (const className of Array.from(_spinner.classList).filter((e: string) => e !== 'mda-spinner')) {
          this._renderer.removeClass(_spinner, className);
        }
        for (const className of Array.from(this._element.classList)) {
          this._renderer.addClass(_spinner, className);
        }
      });
    }
    this._render = render;
  }
  get render(): boolean {
    return this._render;
  }

  private readonly _element: HTMLElement;
  private _render: boolean;

  constructor(private _renderer: Renderer2, private _el: ElementRef<HTMLElement>) {
    this._element = _el.nativeElement;
    this._render = false;

    this.type = 'default';
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
