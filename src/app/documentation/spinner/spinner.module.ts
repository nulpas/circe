import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';
import { SpinnerModule as SpinnerCirceModule } from '@spinner/spinner.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    SpinnerCirceModule,
    ReactiveFormsModule
  ]
})
export class SpinnerModule {}
