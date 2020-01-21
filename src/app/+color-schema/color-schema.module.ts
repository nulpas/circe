import { NgModule } from '@angular/core';
import { ColorSchemaComponent } from './color-schema.component';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [ColorSchemaComponent],
  imports: [
    BrowserModule,
    LayoutModule
  ]
})
export class ColorSchemaModule {}
