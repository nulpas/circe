import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { FormBehaviorModule } from '@form-behavior/form-behavior.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormBehaviorModule
  ],
})
export class SelectModule {}
