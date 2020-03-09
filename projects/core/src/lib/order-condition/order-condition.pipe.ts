import { Pipe, PipeTransform } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';

@Pipe({
  name: 'orderCondition'
})
export class OrderConditionPipe implements PipeTransform {
  constructor(private _o: OrderPipe) {}

  transform(value: any, orderBy: string, condition?: boolean, reverse?: boolean, caseSensitive?: boolean): Array<any> {
    const _condition: boolean = (condition === undefined) ? true : !!condition;
    return (_condition) ? this._o.transform(value, orderBy, !!reverse, !!caseSensitive) : value;
  }
}
