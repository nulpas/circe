import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { FormBehaviorModule } from '@form-behavior/form-behavior.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ButtonComponent],
  imports: [
    CommonModule,
    FormBehaviorModule,
    ReactiveFormsModule
  ]
})
export class ButtonModule {}
