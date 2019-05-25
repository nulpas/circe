import { Injectable } from '@angular/core';
import { startCase as _startCase } from 'lodash';

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

  public static formatString(string: string): string {
    return _startCase(string);
  }

  public static waitFor(milliseconds: number): void {
    const _now: number = Date.now();
    let _timeOut: boolean = false;
    do {
      _timeOut = (Date.now() - _now >= milliseconds);
    } while (!_timeOut);
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
    let _output: any = index;
    ['code', 'id', 'param', 'key'].forEach(e => {
      if (item.hasOwnProperty(e)) {
        _output = item[e];
        return;
      }
    });
    return _output;
  }
}
