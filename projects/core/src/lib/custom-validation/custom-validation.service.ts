import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ToolService } from '../tool/tool.service';
import { SimpleData } from '../_types/data.types';

export type CustomErrorKeys = 'repeated';
export interface CustomErrorMessages {
  [key: string]: string;
}

export interface CustomError {
  [key: string]: CustomErrorRepeatedValues;
}

export interface CustomErrorRepeatedValues {
  repeatedValues: string;
}

@Injectable() export class CustomValidationService {
  private readonly _customMessages: CustomErrorMessages;

  constructor() {
    this._customMessages = {
      repeated: 'There can not be repeated values'
    };
  }

  public static formArrayRepeatedValues(control: FormArray): CustomError | null {
    let _output: CustomError = null;
    const _repeatedValues: Array<SimpleData> = ToolService.repeatedValuesInArray(control.value);
    if (_repeatedValues && Array.isArray(_repeatedValues) && _repeatedValues.length) {
      _output = {
        repeated: { repeatedValues: _repeatedValues.join(', ') }
      };
    }
    return _output;
  }

  public getCustomMessages(keys: CustomErrorKeys | Array<CustomErrorKeys>): CustomErrorMessages {
    const _keys: Array<CustomErrorKeys> = (keys && typeof keys === 'string') ? [keys] : keys as Array<CustomErrorKeys>;
    const _output: CustomErrorMessages = {};
    _keys.forEach((e: CustomErrorKeys) => {
      _output[e] = this._customMessages[e];
    });
    return _output;
  }
}
