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
