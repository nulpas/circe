import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorSchemaComponent } from './color-schema/color-schema.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';

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
