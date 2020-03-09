import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderConditionPipe } from './order-condition.pipe';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  exports: [
    OrderConditionPipe
  ],
  declarations: [OrderConditionPipe],
  imports: [
    CommonModule,
    OrderModule
  ],
  providers: [OrderConditionPipe]
})
export class OrderConditionModule {}
