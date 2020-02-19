import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-space-blue-theme-overview',
  templateUrl: './space-blue-theme-overview.component.html',
  styleUrls: ['./space-blue-theme-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpaceBlueThemeOverviewComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
