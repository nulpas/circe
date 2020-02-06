import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsComponent } from './icons.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolService } from '@core/tool.service';
import { OrderModule } from '@core/external.elements';
import { GridColumnsModule } from '@grid-columns/grid-columns.module';
import {FormBehaviorModule} from '@form-behavior/form-behavior.module';
import { DataModule } from '../../_services/data/data.module';

@NgModule({
  declarations: [IconsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormBehaviorModule,
    OrderModule,
    GridColumnsModule,
    DataModule.forChild()
  ],
  providers: [
    ToolService
  ]
})
export class IconsModule {}
