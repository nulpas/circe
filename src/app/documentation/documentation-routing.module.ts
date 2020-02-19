import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorSchemaComponent } from './color-schema/color-schema.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { PrinciplesComponent } from './principles/principles.component';
import { SessionGuard } from '../_guards/session.guard';
import { TextareaComponent } from './textarea/textarea.component';
import { UserInterfaceComponent } from './user-interface/user-interface.component';
import { SelectComponent } from './select/select.component';
import { ButtonComponent } from './button/button.component';
import { SwitchComponent } from './switch/switch.component';
import { TagComponent } from './tag/tag.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { OverviewComponent } from './overview/overview.component';
import { ThemesDemoComponent } from './themes-demo/themes-demo.component';
import { SpaceBlueThemeOverviewComponent } from './space-blue-theme-overview/space-blue-theme-overview.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'color-schema',
    pathMatch: 'full'
  },
  {
    path: 'color-schema',
    component: ColorSchemaComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'typography',
    component: TypographyComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'icons',
    component: IconsComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'input',
    component: InputComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'radio',
    component: RadioComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'checkbox',
    component: CheckboxComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'principles',
    component: PrinciplesComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'textarea',
    component: TextareaComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'user-interface',
    component: UserInterfaceComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'select',
    component: SelectComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'button',
    component: ButtonComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'switch',
    component: SwitchComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'tag',
    component: TagComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'spinner',
    component: SpinnerComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'overview',
    component: OverviewComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'themes-demo',
    component: ThemesDemoComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'space-blue-theme-overview',
    component: SpaceBlueThemeOverviewComponent,
    canActivate: [SessionGuard]
  },
  {
    path: '**',
    redirectTo: 'color-schema',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SessionGuard]
})
export class DocumentationRoutingModule {}
