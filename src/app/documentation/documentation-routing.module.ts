import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorSchemaComponent } from './color-schema/color-schema.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { PrinciplesComponent } from './principles/principles.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'color-schema',
    pathMatch: 'full'
  },
  {
    path: 'color-schema',
    component: ColorSchemaComponent
  },
  {
    path: 'typography',
    component: TypographyComponent
  },
  {
    path: 'icons',
    component: IconsComponent
  },
  {
    path: 'input',
    component: InputComponent
  },
  {
    path: 'radio',
    component: RadioComponent
  },
  {
    path: 'checkbox',
    component: CheckboxComponent
  },
  {
    path: 'principles',
    component: PrinciplesComponent
  },
  {
    path: '**',
    redirectTo: 'color-schema',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentationRoutingModule {}
