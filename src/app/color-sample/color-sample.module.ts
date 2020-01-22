import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorSampleComponent } from './color-sample.component';
import { ToolService } from '@core/tool.service';

@NgModule({
  exports: [ColorSampleComponent],
  declarations: [ColorSampleComponent],
  imports: [CommonModule],
  providers: [ToolService]
})
export class ColorSampleModule {}
