import { NgModule } from '@angular/core';
import { KeyboardEventsEmitterDirective } from './keyboard-events-emitter.directive';
import { EventsService } from '@lunaeme/circe-core';

@NgModule({
  exports: [
    KeyboardEventsEmitterDirective
  ],
  declarations: [
    KeyboardEventsEmitterDirective
  ],
  providers: [
    EventsService
  ]
})
export class KeyboardEventsEmitterModule {}
