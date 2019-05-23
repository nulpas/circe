import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SpinnerType } from './spinner.types';

@Component({
  selector: 'cc-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SpinnerComponent implements OnInit, OnDestroy {
  @Input() type: SpinnerType = 'default';
  @Input() size: number = 100;
  @Input() tooltip: string;
  @Input() textMarquee: string | Array<string>;
  @Input() textMarqueeInterval: number = 3000;

  public marqueePhrase: string = '';

  private _marqueeInterval: NodeJS.Timeout;

  constructor(private _CD: ChangeDetectorRef) {}

  private _changeMarqueePhrase(sentinel): number {
    this.marqueePhrase = this.textMarquee[sentinel];
    this._CD.markForCheck();
    return (sentinel + 1) % this.textMarquee.length;
  }

  ngOnInit(): void {
    if (this.textMarquee) {
      if (typeof this.textMarquee === 'string') {
        this.marqueePhrase = this.textMarquee;
      } else if (Array.isArray(this.textMarquee) && this.textMarquee.length) {
        let _sentinel: number = this._changeMarqueePhrase(0);
        this._marqueeInterval = setInterval(() => {
          _sentinel = this._changeMarqueePhrase(_sentinel);
        }, this.textMarqueeInterval);
      }
    }
  }

  ngOnDestroy(): void {
    clearInterval(this._marqueeInterval);
  }
}
