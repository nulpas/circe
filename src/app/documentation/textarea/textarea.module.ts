import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaComponent } from './textarea.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBehaviorModule } from '@form-behavior/form-behavior.module';

@NgModule({
  declarations: [TextareaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormBehaviorModule
  ]
})
export class TextareaModule {}
