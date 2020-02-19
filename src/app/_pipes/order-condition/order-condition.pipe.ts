import { Pipe, PipeTransform } from '@angular/core';
import { OrderPipe } from '@core/external.elements';

@Pipe({
  name: 'orderCondition'
})
export class OrderConditionPipe implements PipeTransform {
  constructor(private _o: OrderPipe) {}

  transform(value: Array<any>, orderBy: string, orderCondition?: boolean): Array<any> {
    const _order: boolean = !!orderCondition;
    return (_order) ? this._o.transform(value, orderBy) : value;
  }
}
