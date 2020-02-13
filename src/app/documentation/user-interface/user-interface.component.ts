import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInterfaceComponent implements OnInit, OnDestroy {
  illustrationTokens: string;
  illustrationComponents: string;
  illustrationPatterns: string;
  illustrationTemplates: string;

  constructor() {
    this.illustrationTokens = 'assets/user-interface-tokens.png';
    this.illustrationComponents = 'assets/user-interface-components.png';
    this.illustrationPatterns = 'assets/user-interface-patterns.png';
    this.illustrationTemplates = 'assets/user-interface-templates.png';
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
