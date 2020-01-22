import { Injectable } from '@angular/core';
import { startCase as _startCase, camelCase as _camelCase, kebabCase as _kebabCase } from 'lodash';
import { SimpleData, StringTransformMethods, stringTransformMethodsConstants, StringTransformMethodsConstants } from './_types/data.types';

@Injectable() export class ToolService {
  public months: Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public stringTransformTypes: StringTransformMethodsConstants;

  constructor() {
    this.stringTransformTypes = stringTransformMethodsConstants;
  }

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

  public static checkLastChar(string: string, char: string): string {
    if (string && string[string.length - 1] !== char) {
      return `${string}${char}`;
    }
    return string;
  }

  public static hexToRgb(hex: string): Array<number> {
    return hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m: string, r: string, g: string, b: string) => '#' + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g)
      .map((e: string) => parseInt(e, 16));
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

  /**
   * @deprecated
   */
  public static formatString(string: string): string {
    if (isNaN(Number(string))) {
      return _startCase(string);
    } else {
      return string;
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

  public stringTransform(string: string, transformType?: StringTransformMethods): string {
    const _transformType: StringTransformMethods = transformType || this.stringTransformTypes.START;
    let _output: string = string;
    if (isNaN(Number(string))) {
      switch (_transformType) {
        case this.stringTransformTypes.START:
          _output = _startCase(string);
          break;
        case this.stringTransformTypes.CAMEL:
          _output = _camelCase(string);
          break;
        case this.stringTransformTypes.KEBAB:
          _output = _kebabCase(string);
          break;
      }
    }
    return _output;
  }
}
