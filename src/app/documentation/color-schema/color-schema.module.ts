import { NgModule } from '@angular/core';
import { ColorSchemaComponent } from './color-schema.component';
import { CommonModule } from '@angular/common';
import { ColorSampleModule } from '../../color-sample/color-sample.module';

@NgModule({
  declarations: [ColorSchemaComponent],
  imports: [
    CommonModule,
    ColorSampleModule
  ]
})
export class ColorSchemaModule {}
