import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-schema',
  templateUrl: './color-schema.component.html',
  styleUrls: ['./color-schema.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorSchemaComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
