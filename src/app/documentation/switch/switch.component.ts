import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
