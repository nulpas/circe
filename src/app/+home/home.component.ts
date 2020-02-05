import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  importantIllustrationSrc: string;
  stratioNameImage: string;

  constructor() {
    this.importantIllustrationSrc = 'assets/home-illustration.svg';
    this.stratioNameImage = 'assets/stratio.svg';
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
