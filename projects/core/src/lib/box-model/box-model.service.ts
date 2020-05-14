import { Injectable } from '@angular/core';
import {
  ElementDefinition, ElementDefinitionComplex,
  elementFieldsConstants,
  ElementHash, ElementHashComplex, ElementHashType,
  elementHashTypeDefinitionConstants,
  ElementQuery, ElementQueryComplex
} from '../_types/element.types';

export interface SizeObject {
  with: ProcessedUnitObject;
  height: ProcessedUnitObject;
}

export interface ProcessedUnitObject {
  value: number;
  unit: string;
}

export type ElementId = ElementDefinitionComplex | Array<ElementDefinitionComplex>;

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
  private readonly _defaultBoxModelType: BoxModelType;

  private readonly _defaultElementHashType: ElementHashType;

  private readonly _defaultComputedStylePropertyProcessed: boolean;

  private readonly _allowCssUnits: Array<string>;
  private readonly _additionHorizontalInsideClasses: Array<string>;
  private readonly _additionHorizontalOutsideClasses: Array<string>;
  private readonly _additionVerticalInsideClasses: Array<string>;
  private readonly _additionVerticalOutsideClasses: Array<string>;
  private readonly _nativeDomElementParamsToCheck: Array<string>;

  private readonly _fontSizeRule: SpecialRuleObject;

  constructor() {
    this._defaultBoxModelType = boxModelTypeConstants.VERTICAL;

    this._defaultElementHashType = elementHashTypeDefinitionConstants.CLASS;

    this._defaultComputedStylePropertyProcessed = false;

    this._allowCssUnits = ['px', '%'];
    this._additionHorizontalInsideClasses = ['padding-left', 'padding-right', 'border-left-width', 'border-right-width'];
    this._additionHorizontalOutsideClasses = ['margin-left', 'margin-right'];
    this._additionVerticalInsideClasses = ['padding-top', 'padding-bottom', 'border-top-width', 'border-bottom-width'];
    this._additionVerticalOutsideClasses = ['margin-top', 'margin-bottom'];
    this._nativeDomElementParamsToCheck = ['getBoundingClientRect', 'getElementsByClassName', 'getElementsByTagName', 'querySelector'];

    this._fontSizeRule = { applyOnElements: ['i'], boxModelType: boxModelTypeConstants.HORIZONTAL };
  }

  /**
   * _isElementHash
   *
   * @description
   * Checks if element given param is ElementHash type.
   */
  private _isElementHash(element: ElementDefinition): boolean {
    return !!(
      typeof element === 'object' &&
      elementFieldsConstants.TYPE in element &&
      elementFieldsConstants.NAME in element &&
      (Object.keys(element).length === 2 || Object.keys(element).length === 3)
    );
  }

  /**
   * _isElementQuery
   *
   * @description
   * Checks if element given param is ElementQuery type.
   */
  private _isElementQuery(element: ElementDefinition): boolean {
    return !!(
      typeof element === 'object' &&
      elementFieldsConstants.QUERY in element &&
      (Object.keys(element).length === 1 || Object.keys(element).length === 2)
    );
  }

  /**
   * _isNativeDomElement
   *
   * @description
   * Checks if element given param is a native DOM element.
   */
  private _isNativeDomElement(param: any): param is Element {
    return (!!param) ? (this._nativeDomElementParamsToCheck.map((e: string) => e in param)).every((el) => !!el) : false;
  }

  /**
   * _getElement
   *
   * @description
   * Returns an element dom native object from different types of given params.
   */
  private _getElement(element: ElementDefinition, shadowElement?: Element): Element {
    let _output: Element = element as Element;
    const _shadowElement: Element | Document = shadowElement || document;
    let _element: ElementDefinition = element;
    if (typeof element === 'string') {
      _element = { type: this._defaultElementHashType, name: element };
    }
    if (!this._isNativeDomElement(_element)) {
      if (this._isElementHash(_element)) {
        switch ((_element as ElementHash).type) {
          case elementHashTypeDefinitionConstants.CLASS:
            _output = _shadowElement.getElementsByClassName((_element as ElementHash).name).item(0);
            break;
          case elementHashTypeDefinitionConstants.TAG:
            _output = _shadowElement.getElementsByTagName((_element as ElementHash).name).item(0);
            break;
          case elementHashTypeDefinitionConstants.ID:
            _output = document.getElementById((_element as ElementHash).name);
            break;
        }
      } else if (this._isElementQuery(_element)) {
        _output = _shadowElement.querySelector((_element as ElementQuery).query);
      }
    }
    return (this._isNativeDomElement(_output)) ? _output : null;
  }

  /**
   * _convertToElementIdArray
   *
   * @description
   * Transform elementId type to array of Dom elements.
   */
  private _convertToElementIdArray(elementId: ElementId): Array<Element> {
    const _auxArgument: Array<Element> = [];
    const _elementId: Array<ElementDefinitionComplex> = (Array.isArray(elementId)) ? elementId : [elementId];
    for (const element of _elementId) {
      _auxArgument.push(this.getElement(element));
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

  /**
   * getElement
   *
   * @description
   * Public method to return an element dom native object from different types of given params.
   */
  public getElement(element: ElementDefinitionComplex): Element {
    let _shadowElement: Element;
    if (
      (this._isElementHash(element) || this._isElementQuery(element)) &&
      elementFieldsConstants.SHADOW_ELEMENT in (element as ElementHashComplex | ElementQueryComplex)
    ) {
      _shadowElement = this._getElement((element as ElementHashComplex | ElementQueryComplex).shadowElement);
    }
    return this._getElement(element, _shadowElement);
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
    const _elementId: Array<Element> = this._convertToElementIdArray(elementId);
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
