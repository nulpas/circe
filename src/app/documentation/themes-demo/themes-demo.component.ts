import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-themes-demo',
  templateUrl: './themes-demo.component.html',
  styleUrls: ['./themes-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemesDemoComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
