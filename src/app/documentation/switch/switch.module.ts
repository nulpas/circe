import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from './switch.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SwitchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SwitchModule {}
