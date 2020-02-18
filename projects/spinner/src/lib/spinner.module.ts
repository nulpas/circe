import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner.component';
import { CommonModule } from '@angular/common';

@NgModule({
  exports: [SpinnerComponent],
  declarations: [SpinnerComponent],
  imports: [CommonModule]
})

export class SpinnerModule {}
