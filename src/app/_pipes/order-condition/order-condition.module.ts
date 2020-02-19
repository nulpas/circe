import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderConditionPipe } from './order-condition.pipe';
import { OrderModule } from '@core/external.elements';

@NgModule({
  declarations: [OrderConditionPipe],
  exports: [
    OrderConditionPipe
  ],
  imports: [
    CommonModule,
    OrderModule
  ]
})
export class OrderConditionModule {}
