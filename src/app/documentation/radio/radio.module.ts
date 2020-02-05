import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioComponent } from './radio.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [RadioComponent],
  imports: [CommonModule, ReactiveFormsModule]
})
export class RadioModule {}
