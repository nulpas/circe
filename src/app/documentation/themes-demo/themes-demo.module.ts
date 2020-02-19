import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemesDemoComponent } from './themes-demo.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ThemesDemoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ThemesDemoModule {}
