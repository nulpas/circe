import { Injectable } from '@angular/core';
import {
  SelectDomElementHash,
  SelectDomElementHashType,
  SelectDomElementHashTypeDefinition,
  selectDomElementHashTypeDefinitionConstants,
  SelectDomElementHashDefinition,
  selectDomElementHashDefinitionConstants
} from './_types/data.types';

export interface SizeObject {
  with: ProcessedUnitObject;
  height: ProcessedUnitObject;
}

export interface ProcessedUnitObject {
  value: number;
  unit: string;
}

export type ElementIdSimple = string | SelectDomElementHash | Element;
export type ElementId = ElementIdSimple | Array<ElementIdSimple>;

export type BoxModelType = 'horizontal' | 'vertical';
export interface BoxModelSwapObject {
  type: BoxModelType;
  boxModel: number;
  boxModelAdditions: number;
  boxModelAggregated: number;
  boxModelExtracted: number;
  boxModelAdditionsInside: number;
  boxModelAdditionsOutside: number;
  boxModelAggregatedInside: number;
  boxModelAggregatedOutside: number;
  boxModelExtractedInside: number;
  boxModelExtractedOutside: number;
}

export interface BoxModelAdditionObject {
  boxModelAdditionInside: number;
  boxModelAdditionOutside: number;
}

export interface SpecialRuleObject {
  applyOnElements: Array<string>;
  boxModelType: BoxModelType;
}

export const boxModelTypeConstants = {
  HORIZONTAL: 'horizontal' as BoxModelType,
  VERTICAL: 'vertical' as BoxModelType
};

@Injectable() export class BoxModelService {
  private readonly _selectDomElementTypeConstants: SelectDomElementHashTypeDefinition;
  private readonly _selectDomElementConstants: SelectDomElementHashDefinition;

  private readonly _defaultBoxModelType: BoxModelType;
  private readonly _defaultSelectDomType: SelectDomElementHashType;
  private readonly _defaultComputedStylePropertyProcessed: boolean;

  private readonly _allowCssUnits: Array<string>;
  private readonly _additionHorizontalInsideClasses: Array<string>;
  private readonly _additionHorizontalOutsideClasses: Array<string>;
  private readonly _additionVerticalInsideClasses: Array<string>;
  private readonly _additionVerticalOutsideClasses: Array<string>;
  private readonly _nativeDomElementParamsToCheck: Array<string>;

  private readonly _fontSizeRule: SpecialRuleObject;

  constructor() {
    this._selectDomElementTypeConstants = selectDomElementHashTypeDefinitionConstants;
    this._selectDomElementConstants = selectDomElementHashDefinitionConstants;

    this._defaultBoxModelType = boxModelTypeConstants.VERTICAL;
    this._defaultSelectDomType = this._selectDomElementTypeConstants.CLASS;
    this._defaultComputedStylePropertyProcessed = false;

    this._allowCssUnits = ['px', '%'];
    this._additionHorizontalInsideClasses = ['padding-left', 'padding-right', 'border-left-width', 'border-right-width'];
    this._additionHorizontalOutsideClasses = ['margin-left', 'margin-right'];
    this._additionVerticalInsideClasses = ['padding-top', 'padding-bottom', 'border-top-width', 'border-bottom-width'];
    this._additionVerticalOutsideClasses = ['margin-top', 'margin-bottom'];
    this._nativeDomElementParamsToCheck = ['getBoundingClientRect', 'getElementsByClassName', 'getElementsByTagName'];

    this._fontSizeRule = { applyOnElements: ['i'], boxModelType: boxModelTypeConstants.HORIZONTAL };
  }

  private _isSelectDomElementObject(param: any): param is SelectDomElementHash {
    const _hasTwoParameters: boolean = (
      Object.keys(param).length === 2 &&
      this._selectDomElementConstants.NAME in param &&
      this._selectDomElementConstants.TYPE in param
    );
    const _hasThreeParameters: boolean = (Object.keys(param).length === 3 && this._selectDomElementConstants.SHADOW_ELEMENT in param);
    return (_hasTwoParameters || _hasThreeParameters);
  }

  private _isNativeDomElement(param: any): param is Element {
    return (this._nativeDomElementParamsToCheck.map((e: string) => e in param)).every((el) => !!el);
  }

  private _transformElementIdentificationArgument(elementId: ElementId): Array<Element> {
    const _auxArgument: Array<Element> = [];
    if (Array.isArray(elementId)) {
      (elementId as Array<ElementIdSimple>).forEach((e: ElementIdSimple) => {
        if (typeof e === 'string') {
          _auxArgument.push(this.getElement({name: e, type: this._defaultSelectDomType}));
        } else if (this._isSelectDomElementObject(e)) {
          _auxArgument.push(this.getElement(e));
        } else if (this._isNativeDomElement(e)) {
          _auxArgument.push(e);
        } else {
          throw new TypeError(`Element ${e} in Array is not SelectDomElementHash type.`);
        }
      });
    } else if (typeof elementId === 'string') {
      _auxArgument.push(this.getElement({ name: elementId, type: this._defaultSelectDomType }));
    } else if (this._isSelectDomElementObject(elementId)) {
      _auxArgument.push(this.getElement(elementId));
    } else if (this._isNativeDomElement(elementId)) {
      _auxArgument.push(elementId);
    } else {
      throw new TypeError(`Argument ${elementId} is not SelectDomElementHash type.`);
    }
    return _auxArgument;
  }

  private _getElementAdditions(element: Element, boxModelType?: BoxModelType): BoxModelAdditionObject {
    const _type: BoxModelType = boxModelType || this._defaultBoxModelType;
    const _elementStyle: CSSStyleDeclaration = window.getComputedStyle(element);
    const _output: BoxModelAdditionObject = {
      boxModelAdditionInside: 0,
      boxModelAdditionOutside: 0
    };
    const _auxOutputInside: Array<string> = [];
    const _auxOutputOutside: Array<string> = [];
    if (_type === boxModelTypeConstants.HORIZONTAL) {
      this._additionHorizontalInsideClasses.forEach((e: string) => {
        _auxOutputInside.push(_elementStyle.getPropertyValue(e));
      });
      this._additionHorizontalOutsideClasses.forEach((e: string) => {
        _auxOutputOutside.push(_elementStyle.getPropertyValue(e));
      });
    } else {
      this._additionVerticalInsideClasses.forEach((e: string) => {
        _auxOutputInside.push(_elementStyle.getPropertyValue(e));
      });
      this._additionVerticalOutsideClasses.forEach((e: string) => {
        _auxOutputOutside.push(_elementStyle.getPropertyValue(e));
      });
    }
    _auxOutputInside.forEach((el: string) => {
      if (el !== '0px') {
        _output.boxModelAdditionInside += this.readCssUnits(el).value;
      }
    });
    _auxOutputOutside.forEach((el: string) => {
      if (el !== '0px') {
        _output.boxModelAdditionOutside += this.readCssUnits(el).value;
      }
    });
    return _output;
  }

  public getComputedStyleProperty(element: Element, property: string, processed?: boolean): string | ProcessedUnitObject {
    const _processed: boolean = processed || this._defaultComputedStylePropertyProcessed;
    const _elementComputedStyles: CSSStyleDeclaration = window.getComputedStyle(element);
    const _output: string = _elementComputedStyles.getPropertyValue(property);
    if (_output && _processed) {
      return this.readCssUnits(_output);
    }
    return _output;
  }

  public processElementForSpecialRules(element: Element): Element {
    if (this._fontSizeRule.applyOnElements.includes(element.tagName.toLowerCase())) {
      const _elementBoxModel: BoxModelSwapObject = this.getBoxModel(element, boxModelTypeConstants.HORIZONTAL);
      const _elementFontSize: ProcessedUnitObject = this.getComputedStyleProperty(element, 'font-size', true) as ProcessedUnitObject;
      if (_elementBoxModel.boxModelExtractedInside !== _elementFontSize.value) {
        (element as HTMLElement).style.width = `${_elementFontSize.value}px`;
        return element as Element;
      }
    }
    return element;
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

  public getElement(element: string | SelectDomElementHash): Element {
    const _element: SelectDomElementHash = (typeof element === 'string') ?
      { name: element, type: this._defaultSelectDomType } :
      element;
    let _output: Element;
    const _shadowElement: Element | Document = (this._selectDomElementConstants.SHADOW_ELEMENT in _element) ?
      _element.shadowElement : document;
    if (_element.type === this._selectDomElementTypeConstants.CLASS) {
      _output = _shadowElement.getElementsByClassName(_element.name).item(0);
    } else if (_element.type === this._selectDomElementTypeConstants.TAG) {
      _output = _shadowElement.getElementsByTagName(_element.name).item(0);
    } else if (_element.type === this._selectDomElementTypeConstants.ID) {
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
      boxModelExtracted: 0,
      boxModelAdditionsInside: 0,
      boxModelAdditionsOutside: 0,
      boxModelAggregatedInside: 0,
      boxModelAggregatedOutside: 0,
      boxModelExtractedInside: 0,
      boxModelExtractedOutside: 0
    };
    const _elementId: Array<Element> = this._transformElementIdentificationArgument(elementId);
    _elementId.forEach((e: Element) => {
      const _elementRect: DOMRect | ClientRect = e.getBoundingClientRect();
      const _additions: BoxModelAdditionObject = this._getElementAdditions(e, _output.type);
      _output.boxModel += (_output.type === boxModelTypeConstants.HORIZONTAL) ? _elementRect.width : _elementRect.height;
      _output.boxModelAdditions += _additions.boxModelAdditionInside + _additions.boxModelAdditionOutside;
      _output.boxModelAdditionsInside += _additions.boxModelAdditionInside;
      _output.boxModelAdditionsOutside += _additions.boxModelAdditionOutside;
    });
    _output.boxModelAggregated = _output.boxModel + _output.boxModelAdditions;
    _output.boxModelExtracted = _output.boxModel - _output.boxModelAdditions;
    _output.boxModelAggregatedInside = _output.boxModel + _output.boxModelAdditionsInside;
    _output.boxModelAggregatedOutside = _output.boxModel + _output.boxModelAdditionsOutside;
    _output.boxModelExtractedInside = _output.boxModel - _output.boxModelAdditionsInside;
    _output.boxModelExtractedOutside = _output.boxModel - _output.boxModelAdditionsOutside;
    return _output;
  }
}
