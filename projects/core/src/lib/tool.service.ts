import { Injectable } from '@angular/core';
import { startCase as _startCase } from 'lodash';
import { SimpleData } from './_types/data.types';

@Injectable() export class ToolService {
  public months: Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor() {}

  public static getValueFromMultiLevelObject(object: any, key: string, separator?: string): any {
    const _separator = separator || '.';
    if (object[key] !== undefined) {
      return object[key];
    }
    try {
      return key.split(_separator).reduce((obj: any, index: any) => {
        return obj[index];
      }, object);
    } catch (e) {
      if (e instanceof TypeError) {
        return undefined;
      } else {
        throw e;
      }
    }
  }

  public static setValueInMultiLevelObject(object: any, key: string, value: any, separator?: string): any {
    const _separator: string = separator || '.';
    return  key.split(_separator).reduce((o: any, i: string) => {
      if (o && typeof o[i] === 'object') {
        return o[i];
      }
      if (o && i in o) {
        o[i] = value;
        return o;
      }
    }, object);
  }

  public static formatString(string: string): string {
    if (isNaN(Number(string))) {
      return _startCase(string);
    } else {
      return string;
    }
  }

  public static waitFor(milliseconds: number): void {
    const _now: number = Date.now();
    let _timeOut: boolean = false;
    do {
      _timeOut = (Date.now() - _now >= milliseconds);
    } while (!_timeOut);
  }

  public static repeatedValuesInArray(values: Array<SimpleData>, unique?: boolean): Array<SimpleData> {
    const _unique: boolean = unique || true;
    let _output: Array<SimpleData> = values.filter((e: SimpleData, i: number) => values.indexOf(e) !== i);
    if (_unique) {
      _output = Array.from(new Set(_output));
    }
    return _output;
  }

  /**
   * @deprecated
   */
  public static getValueFromDotedKey(object: any, dotedKey: string, separator?: string): any {
    const _separator = separator || '.';

    if (object[dotedKey] !== undefined) {
      return object[dotedKey];
    }
    try {
      return dotedKey.split(_separator).reduce((obj, index) => {
        return obj[index];
      }, object);
    } catch (e) {
      if (e instanceof TypeError) {
        return undefined;
      } else {
        throw e;
      }
    }
  }

  public identifier(index: number, item: any): any {
    let _output: any = (typeof item === 'string') ? item : index;
    ['code', 'id', 'param', 'key'].forEach((e: string) => {
      if (item.hasOwnProperty(e)) {
        _output = item[e];
        return;
      }
    });
    return _output;
  }
}
