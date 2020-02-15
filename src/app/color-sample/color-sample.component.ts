import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ToolService } from '@core/tool.service';

@Component({
  selector: 'app-color-sample',
  templateUrl: './color-sample.component.html',
  styleUrls: ['./color-sample.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorSampleComponent implements OnInit, OnDestroy {
  @Input() colorName: string;
  @Input() colorHex: string;

  public elementWidth: number;
  public elementHeight: number;
  public colorRgb: string;

  private readonly _defaultElementWidth: number = 140;
  private readonly _defaultElementHeight: number = 100;

  constructor() {
    this.elementWidth = this._defaultElementWidth;
    this.elementHeight = this._defaultElementHeight;
  }

  ngOnInit(): void {
    this.colorRgb = `rgb(${ToolService.hexToRgb(this.colorHex).join(', ')})`;
  }

  ngOnDestroy(): void {}
}
