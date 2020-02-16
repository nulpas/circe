import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBehaviorModule } from '@form-behavior/form-behavior.module';

@NgModule({
  declarations: [TagComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormBehaviorModule
  ]
})
export class TagModule {}
