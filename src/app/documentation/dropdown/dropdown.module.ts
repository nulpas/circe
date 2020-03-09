import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { DropdownModule as DropdownCirceModule } from '@dropdown/dropdown.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DropdownComponent],
  imports: [
    CommonModule,
    DropdownCirceModule,
    ReactiveFormsModule
  ]
})
export class DropdownModule {}
