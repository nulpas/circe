import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsComponent } from './icons.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolService } from '@core/tool/tool.service';
import { FormBehaviorModule } from '@form-behavior/form-behavior.module';
import { DataModule } from '../../_services/data/data.module';
import { EventsService } from '@core/events/events.service';
import { OrderConditionModule } from '@core/order-condition/order-condition.module';

@NgModule({
  declarations: [IconsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormBehaviorModule,
    OrderConditionModule,
    DataModule.forChild()
  ],
  providers: [
    ToolService,
    EventsService
  ]
})
export class IconsModule {}
