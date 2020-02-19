import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonSpinnerDirective } from './button-spinner.directive';

@NgModule({
  exports: [ButtonSpinnerDirective],
  declarations: [ButtonSpinnerDirective],
  imports: [CommonModule]
})
export class ButtonSpinnerModule {}
