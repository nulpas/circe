import { NgModule } from '@angular/core';
import { ClickOutsideDirective } from './click-outside.directive';
import { EventsModule } from '@lunaeme/circe-core';


@NgModule({
  exports: [ClickOutsideDirective],
  declarations: [ClickOutsideDirective],
  imports: [
    EventsModule.forChild()
  ]
})
export class ClickOutsideModule {}
