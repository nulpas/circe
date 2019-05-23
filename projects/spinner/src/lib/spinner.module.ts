import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  exports: [
    SpinnerComponent
  ],
  declarations: [
    SpinnerComponent
  ],
  imports: [
    BrowserModule
  ]
})

export class SpinnerModule {}
