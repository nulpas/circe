import { NgModule } from '@angular/core';
import { GridColumnsDirective } from './grid-columns.directive';
import { BoxModelModule } from '@lunaeme/circe-core';

@NgModule({
  exports: [GridColumnsDirective],
  declarations: [GridColumnsDirective],
  imports: [
    BoxModelModule.forChild()
  ]
})
export class GridColumnsModule {}
