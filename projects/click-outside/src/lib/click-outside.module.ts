import { NgModule } from '@angular/core';
import { ClickOutsideDirective } from './click-outside.directive';
import { EventsService } from '@lunaeme/circe-core';

@NgModule({
  exports: [
    ClickOutsideDirective
  ],
  declarations: [
    ClickOutsideDirective
  ],
  providers: [
    EventsService
  ]
})

export class ClickOutsideModule {}
