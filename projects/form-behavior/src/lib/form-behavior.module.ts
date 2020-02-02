import { NgModule } from '@angular/core';
import { FormBehaviorDirective } from './form-behavior.directive';
import { EventsService, ToolService } from '@lunaeme/circe-core';

@NgModule({
  exports: [FormBehaviorDirective],
  declarations: [FormBehaviorDirective],
  providers: [
    ToolService,
    EventsService
  ]
})
export class FormBehaviorModule {}
