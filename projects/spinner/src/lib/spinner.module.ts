import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner.component';
import { CommonModule } from '@angular/common';
import { ButtonSpinnerModule } from './button-spinner/button-spinner.module';
import { ButtonSpinnerDirective } from './button-spinner/button-spinner.directive';

@NgModule({
  exports: [SpinnerComponent, ButtonSpinnerDirective],
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    ButtonSpinnerModule
  ]
})

export class SpinnerModule {}
