import { Injectable } from '@angular/core';
import { SelectDomElementObject, SelectDomElementObjectType } from './_types/data.types';

export interface SizeObject {
  with: ProcessedUnitObject;
  height: ProcessedUnitObject;
}

export interface ProcessedUnitObject {
  value: number;
  unit: string;
}

export interface SelectDomTypes {
  class: 'class';
  tag: 'tag';
  id: 'id';
}
export interface SelectDomObjectParams {
  name: 'name';
  type: 'type';
}

export type ElementId = string | Array<string> | SelectDomElementObject | Array<SelectDomElementObject>;

export type BoxModelType = 'horizontal' | 'vertical';
export interface BoxModelSwapObject {
  type: BoxModelType;
  boxModel: number;
  boxModelAdditions: number;
  boxModelAggregated: number;
  boxModelExtracted: number;
}

@Injectable() export class BoxModelService {
  private readonly _allowCssUnits: Array<string>;
  private readonly _defaultBoxModelType: BoxModelType;
  private readonly _selectDomTypes: SelectDomTypes;
  private readonly _defaultSelectDomType: SelectDomElementObjectType;
  private readonly _selectDomElementParams: SelectDomObjectParams;

  constructor() {
    this._allowCssUnits = ['px', '%'];
    this._defaultBoxModelType = 'vertical';
    this._selectDomTypes = { class: 'class', tag: 'tag', id: 'id' };
    this._defaultSelectDomType = this._selectDomTypes.class;
    this._selectDomElementParams = { name: 'name', type: 'type' };
  }

  private _isSelectDomElementObject(param: any): param is SelectDomElementObject {
    return (param.hasOwnProperty(this._selectDomElementParams.name) && param.hasOwnProperty(this._selectDomElementParams.type));
  }

  private _transformElementIdentificationArgument(elementId: ElementId): Array<SelectDomElementObject> {
    const _auxArgument: Array<SelectDomElementObject> = [];
    if (Array.isArray(elementId)) {
      (elementId as Array<string | SelectDomElementObject>).forEach((e: string | SelectDomElementObject) => {
        if (typeof e === 'string') {
          _auxArgument.push({ name: e, type: this._defaultSelectDomType });
        } else if (!this._isSelectDomElementObject(e)) {
          throw new TypeError(`Element ${e} in Array is not SelectDomElementObject type.`);
        }
      });
    } else if (typeof elementId === 'string') {
      _auxArgument.push({ name: elementId, type: this._defaultSelectDomType });
    } else if (this._isSelectDomElementObject(elementId)) {
      _auxArgument.push(elementId);
    } else {
      throw new TypeError(`Argument ${elementId} is not SelectDomElementObject type.`);
    }
    return _auxArgument;
  }

  private _getElementAdditions(element: Element, boxModelType?: BoxModelType): number {
    const _type: BoxModelType = boxModelType || this._defaultBoxModelType;
    const _elementStyle: CSSStyleDeclaration = window.getComputedStyle(element);
    let _output: number = 0;
    const _auxOutput: Array<string> = [];
    if (_type === 'horizontal') {
      _auxOutput.push(_elementStyle.getPropertyValue('padding-left'));
      _auxOutput.push(_elementStyle.getPropertyValue('padding-right'));
      _auxOutput.push(_elementStyle.getPropertyValue('margin-left'));
      _auxOutput.push(_elementStyle.getPropertyValue('margin-right'));
      _auxOutput.push(_elementStyle.getPropertyValue('border-left-width'));
      _auxOutput.push(_elementStyle.getPropertyValue('border-right-width'));
    } else {
      _auxOutput.push(_elementStyle.getPropertyValue('padding-top'));
      _auxOutput.push(_elementStyle.getPropertyValue('padding-bottom'));
      _auxOutput.push(_elementStyle.getPropertyValue('margin-top'));
      _auxOutput.push(_elementStyle.getPropertyValue('margin-bottom'));
      _auxOutput.push(_elementStyle.getPropertyValue('border-top-width'));
      _auxOutput.push(_elementStyle.getPropertyValue('border-bottom-width'));
    }
    _auxOutput.forEach((el: string) => {
      if (el !== '0px') {
        _output += this.readCssUnits(el).value;
      }
    });
    return _output;
  }

  public readCssUnits(expression: string): ProcessedUnitObject {
    const _output: ProcessedUnitObject = { value: 0, unit: '' };
    this._allowCssUnits.forEach((e: string) => {
      if (expression.includes(e)) {
        _output.unit = e;
        const _aux: Array<string> = expression.split(e).filter((el: string) => !!el);
        if (_aux.length === 1) {
          _output.value = Number(_aux[0]);
        }
        return;
      }
    });
    return (_output.value && _output.unit) ? _output : null;
  }

  public processSizeString(sizeString: string): SizeObject {
    const _output: SizeObject = { with: null, height: null };
    if (sizeString) {
      const _auxSize: Array<string> = sizeString.split(' ');
      if (_auxSize.length === 1) {
        const _cssUnit: ProcessedUnitObject = this.readCssUnits(_auxSize[0]);
        _output.with = _cssUnit;
        _output.height = _cssUnit;
      } else if (_auxSize.length === 2) {
        _output.height = this.readCssUnits(_auxSize[0]);
        _output.with = this.readCssUnits(_auxSize[1]);
      }
    }
    return (_output.with && _output.height) ? _output : null;
  }

  public getElement(element: string | SelectDomElementObject): Element {
    const _element: SelectDomElementObject = (typeof element === 'string') ?
      { name: element, type: this._defaultSelectDomType } :
      element;
    let _output: Element;
    if (_element.type === this._selectDomTypes.class) {
      _output = document.getElementsByClassName(_element.name).item(0);
    } else if (_element.type === this._selectDomTypes.tag) {
      _output = document.getElementsByTagName(_element.name).item(0);
    } else if (_element.type === this._selectDomTypes.id) {
      _output = document.getElementById(_element.name);
    }
    return _output;
  }

  public getBoxModel(elementId: ElementId, boxModelType?: BoxModelType): BoxModelSwapObject {
    const _output: BoxModelSwapObject = {
      type: boxModelType || this._defaultBoxModelType,
      boxModel: 0,
      boxModelAdditions: 0,
      boxModelAggregated: 0,
      boxModelExtracted: 0
    };
    const _elementId: Array<SelectDomElementObject> = this._transformElementIdentificationArgument(elementId);
    _elementId.forEach((e: SelectDomElementObject) => {
      const _element: Element = this.getElement(e);
      const _elementRect: DOMRect | ClientRect = _element.getBoundingClientRect();
      _output.boxModel += (_output.type === 'horizontal') ? _elementRect.width : _elementRect.height;
      _output.boxModelAdditions += this._getElementAdditions(_element, _output.type);
    });
    _output.boxModelAggregated = _output.boxModel + _output.boxModelAdditions;
    _output.boxModelExtracted = _output.boxModel - _output.boxModelAdditions;
    return _output;
  }
}
