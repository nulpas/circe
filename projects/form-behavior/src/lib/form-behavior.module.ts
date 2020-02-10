import { NgModule } from '@angular/core';
import { FormBehaviorDirective } from './form-behavior.directive';
import { ToolService } from '@lunaeme/circe-core';

@NgModule({
  exports: [FormBehaviorDirective],
  declarations: [FormBehaviorDirective],
  providers: [ToolService]
})
export class FormBehaviorModule {}
