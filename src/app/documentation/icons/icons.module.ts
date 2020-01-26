import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsComponent } from './icons.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../_services/data.service';
import { ToolService } from '@core/tool.service';
import { OrderModule } from '@core/external.elements';
import { GridColumnsModule } from '../../../../projects/grid-columns/src/lib/grid-columns.module';

@NgModule({
  declarations: [IconsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrderModule,
    GridColumnsModule
  ],
  providers: [
    DataService,
    ToolService
  ]
})
export class IconsModule {}
