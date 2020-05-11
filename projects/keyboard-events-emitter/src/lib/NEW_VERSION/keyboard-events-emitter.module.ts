import { NgModule } from '@angular/core';
import { KeyboardEventsEmitterDirective } from './keyboard-events-emitter.directive';
import { EventsModule, ToolModule } from '@lunaeme/circe-core';

@NgModule({
  exports: [KeyboardEventsEmitterDirective],
  declarations: [KeyboardEventsEmitterDirective],
  imports: [
    EventsModule.forChild(),
    ToolModule.forChild()
  ]
})
export class KeyboardEventsEmitterModule {}
