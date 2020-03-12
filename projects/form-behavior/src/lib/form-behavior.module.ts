import { NgModule } from '@angular/core';
import { FormBehaviorDirective } from './form-behavior.directive';
import { ToolModule } from '@lunaeme/circe-core';

@NgModule({
  exports: [FormBehaviorDirective],
  declarations: [FormBehaviorDirective],
  imports: [
    ToolModule.forChild()
  ]
})
export class FormBehaviorModule {}
