import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';
import { SpinnerModule as SpinnerComponentModule } from '@spinner/spinner.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    SpinnerComponentModule,
    ReactiveFormsModule
  ]
})
export class SpinnerModule {}
