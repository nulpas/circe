import { NgModule } from '@angular/core';
import { GridColumnsDirective } from './grid-columns.directive';
import { BoxModelService } from '@lunaeme/circe-core';

@NgModule({
  exports: [GridColumnsDirective],
  declarations: [GridColumnsDirective],
  providers: [BoxModelService]
})
export class GridColumnsModule {}
