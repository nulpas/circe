import {
  AfterViewChecked, AfterViewInit, Directive, ElementRef, EventEmitter,
  Input, OnChanges, OnDestroy, OnInit, Output,
  Renderer2, SimpleChanges
} from '@angular/core';
import {
  ACTION, ADD, AssociateElementType, ClassAction,
  ClassEvent, DISABLED, elementRules, elementStatuses,
  ERROR, FOCUSED, FORCE_TO_DISABLED, FORCE_TO_SMALL,
  FormBehaviorTargetElement, LABEL, LabelForceType, LabelRule,
  REMOVE, REPORT, Rule, WRAPPER
} from './form-behavior.types';
import { ToolService } from '@lunaeme/circe-core';
import { fromEvent, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[ccFormBehavior]'
})
export class FormBehaviorDirective implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked, OnChanges {
  @Input() report: string = '';
  @Input() error: string = '';
  @Input() render: boolean = false;
  @Output() clickIcon: EventEmitter<MouseEvent> = new EventEmitter();

  public valid: boolean;
  public pristine: boolean;
  public touched: boolean;

  private _isAngularForm: boolean;
  private _component: HTMLElement;
  private _label: HTMLElement;
  private _wrapper: HTMLElement;
  private _report: HTMLElement;

  private _reportContent: string;

  private readonly _element: FormBehaviorTargetElement;
  private readonly _success: boolean;
  private _elementRules: Rule;
  private readonly _elementOriginalType: string;

  private _disabled$: Subject<boolean> = new Subject();
  private _componentDestroyed$: Subject<undefined> = new Subject();

  constructor(private _el: ElementRef<FormBehaviorTargetElement>, private _renderer: Renderer2) {
    this._element = this._el.nativeElement;
    this._success = this._getSuccessElement();
    if (this._success) {
      this._elementOriginalType = this._element.getAttribute('type') || 'text';

      fromEvent(this._element, 'input').pipe(
        takeUntil(this._componentDestroyed$)
      ).subscribe((event: Event) => {
        if (!this._isAngularForm && this.pristine) {
          this.pristine = false;
        }
        this._normalizeAction();
        this._getFormStatuses(Array.from(this._element.classList));
        this._errorFocusBehavior();
        this._setElementPlaceholder();
      });

      fromEvent(this._element, 'change').pipe(
        takeUntil(this._componentDestroyed$)
      ).subscribe((event: Event) => {
        this._normalizeAction();
        this._getFormStatuses(Array.from(this._element.classList));
        if (!this._isAngularForm && !this.touched) {
          this.touched = true;
        }
        this._errorFocusBehavior();
        this._setElementPlaceholder();
      });

      fromEvent(this._element, 'focusin').pipe(
        takeUntil(this._componentDestroyed$)
      ).subscribe((event: FocusEvent) => {
        this._getFormStatuses(Array.from(this._element.classList));
        _renderer.addClass(this._element, 'focus');
        this._renderAssociates(LABEL, FOCUSED, ADD);
        this._renderAssociates(WRAPPER, FOCUSED, ADD);
        this._renderAssociates(REPORT, FOCUSED, ADD);
      });

      fromEvent(this._element, 'focusout').pipe(
        takeUntil(this._componentDestroyed$)
      ).subscribe((event: FocusEvent) => {
        _renderer.removeClass(this._element, 'focus');
        this._renderAssociates(LABEL, FOCUSED, REMOVE);
        this._renderAssociates(WRAPPER, FOCUSED, REMOVE);
        this._renderAssociates(REPORT, FOCUSED, REMOVE);
      });

      this._disabled$.pipe(
        distinctUntilChanged((prev, cur) => prev === cur),
        takeUntil(this._componentDestroyed$)
      ).subscribe((disabled: boolean) => {
        this._getFormStatuses(Array.from(this._element.classList));
        if (disabled) {
          this._renderer.addClass(this._element, 'disabled');
          this._renderAssociates(LABEL, DISABLED, ADD);
          this._renderAssociates(WRAPPER, DISABLED, ADD);
          this._renderAssociates(REPORT, DISABLED, ADD);
          if (!this.valid) {
            this._renderer.removeClass(this._element, 'error');
            this._renderAssociates(LABEL, ERROR, REMOVE);
            this._renderAssociates(WRAPPER, ERROR, REMOVE);
            this._renderAssociates(REPORT, ERROR, REMOVE);
          }
        } else {
          this._renderer.removeClass(this._element, 'disabled');
          this._renderAssociates(LABEL, DISABLED, REMOVE);
          this._renderAssociates(WRAPPER, DISABLED, REMOVE);
          this._renderAssociates(REPORT, DISABLED, REMOVE);
          if (!this.valid && !this.pristine) {
            this._renderer.addClass(this._element, 'error');
            this._renderAssociates(LABEL, ERROR, ADD);
            this._renderAssociates(WRAPPER, ERROR, ADD);
            this._renderAssociates(REPORT, ERROR, ADD);
          }
        }
      });
    }
  }

  private _checkLabel(element: HTMLLabelElement): boolean {
    const _labelRules: LabelRule = this._elementRules.label;
    const _isLabel: boolean = _labelRules.tag === element.tagName && element.classList.contains(_labelRules.main);
    if (!element.textContent) {
      element.style.display = 'none';
    }
    return _isLabel && !!element.textContent;
  }

  private _checkWrapper(element: HTMLElement): boolean {
    return this._elementRules.wrappers.tags.some((tag: string) => element.tagName === tag) &&
      this._elementRules.wrappers.classes.some((className: string) => element.classList.contains(className));
  }

  private _checkReport(element: HTMLElement): boolean {
    return this._elementRules.report.tags.some((tag: string) => element.tagName === tag) &&
      this._elementRules.report.classes.some((className: string) => element.classList.contains(className));
  }

  private _checkAction(element: HTMLElement): boolean {
    return (this._elementRules.action) ?
      this._elementRules.action.classes.some((className: string) => element.classList.contains(className)) :
      false ;
  }

  private _setElementPlaceholder(): void {
    if (this._elementRules.placeholder && Object.keys(this._elementRules.placeholder).length) {
      (this._element.value === this._elementRules.placeholder.value) ?
        this._renderer.addClass(this._element, this._elementRules.placeholder.class) :
        this._renderer.removeClass(this._element, this._elementRules.placeholder.class);
    }
  }

  private _getSuccessElement(): boolean {
    if (Object.keys(elementRules).some((tag: string) => tag === this._el.nativeElement.tagName)) {
      this._elementRules = elementRules[this._el.nativeElement.tagName];
    }
    return !!this._elementRules && this._element.classList.contains(this._elementRules.main);
  }

  private _getAssociateElements(): void {
    const _sibling: HTMLLabelElement = this._element.previousElementSibling as HTMLLabelElement;
    if (!!_sibling && this._checkLabel(_sibling)) {
      this._label = _sibling;
    } else {
      const _parent: HTMLElement = this._element.parentElement;
      if (!!_parent && this._checkWrapper(_parent)) {
        this._wrapper = _parent;
        const _wrapperSibling: HTMLLabelElement = this._wrapper.previousElementSibling as HTMLLabelElement;
        if (!!_wrapperSibling && this._checkLabel(_wrapperSibling)) {
          this._label = _wrapperSibling;
        }
      }
    }
    const _nextSibling: HTMLElement = this._element.nextElementSibling as HTMLElement;
    if (!!_nextSibling && this._checkReport(_nextSibling)) {
      this._report = _nextSibling;
    } else if (this._wrapper) {
      if (this._wrapper.nextElementSibling && this._checkReport(this._wrapper.nextElementSibling as HTMLElement)) {
        this._report = this._wrapper.nextElementSibling as HTMLElement;
      }
    }

    this._component = this._renderer.createElement('div');
    this._renderer.addClass(this._component, 'mda-component');
    const _globalParent: HTMLElement = (this._wrapper) ? this._wrapper.parentElement : this._element.parentElement;
    if (this._label) {
      this._renderer.appendChild(this._component, this._label);
    }
    (this._wrapper) ?
      this._renderer.appendChild(this._component, this._wrapper) :
      this._renderer.appendChild(this._component, this._element);
    if (this._report) {
      this._renderer.appendChild(this._component, this._report);
    }
    this._renderer.appendChild(_globalParent, this._component);
  }

  private _labelForceBehavior(type: LabelForceType): void {
    const _forceType: Array<string> = this._elementRules.label[type];
    const _isForceType: boolean = !!_forceType && Array.isArray(_forceType) && !!_forceType.length;
    const _condition: boolean = (type === FORCE_TO_SMALL) ?
      _isForceType && !this._label.classList.contains(this._elementRules.label.sizes.small) :
      _isForceType;
    if (_condition) {
      const _elementHasClassToForce: boolean = this._elementRules.label[type]
        .some((className: string) => this._element.classList.contains(className));
      const _wrapperHasClassToForce: boolean = !!this._wrapper &&
        this._elementRules.label[type].some((className: string) => this._wrapper.classList.contains(className));
      if (_elementHasClassToForce || _wrapperHasClassToForce) {
        if (type === FORCE_TO_SMALL) {
          this._renderer.addClass(this._label, this._elementRules.label.sizes.small);
        }
        if (type === FORCE_TO_DISABLED) {
          this._label.style.display = 'none';
          this._label = undefined;
        }
      }
    }
  }

  private _normalizeElements(): void {
    // ###### Element
    this._renderer.setProperty(this._element, 'autocomplete', 'off');

    // ###### Force label behaviors
    if (this._label) {
      this._labelForceBehavior(FORCE_TO_SMALL);
      this._labelForceBehavior(FORCE_TO_DISABLED);
    }

    // ###### LABEL for and element id
    if (!this._element.id) {
      const _uuid: string = ToolService.generateUuid();
      this._renderer.setAttribute(this._element, 'id', _uuid);
      if (this._label) {
        this._renderer.setAttribute(this._label, 'for', _uuid);
      }
    } else if (this._label) {
      const _labelFor: string = this._label.getAttribute('for');
      if (!_labelFor || _labelFor !== this._element.id) {
        this._renderer.setAttribute(this._label, 'for', this._element.id);
      }
    }

    // ###### Report
    const _subText: string = this.error || this.report;
    if (!this._report && _subText) {
      this._report = this._renderer.createElement('span');
      this._renderer.addClass(this._report, this._elementRules.report.main);
      this._renderer.appendChild(this._report, this._renderer.createText(_subText));
      this._renderer.appendChild(this._component, this._report);
    }

    // ###### Wrap
    const _hasWrapperClass: boolean = this._elementRules.wrappers.classes
      .some((classNAme: string) => this._element.classList.contains(classNAme));
    if (_hasWrapperClass) {
      const _wrapClasses: Array<string> = Array.from(this._element.classList)
        .filter((className: string) => className.includes(this._elementRules.main));
      const _wrapStatuses: Array<ClassEvent> = elementStatuses
        .filter((className: ClassEvent) => this._element.classList.contains(className));
      const _containerWrapperExists: boolean = this._checkWrapper(this._element.parentElement);
      if (_containerWrapperExists) {
        this._wrapper = this._element.parentElement;
        this._renderer.removeAttribute(this._wrapper, 'class');
        this._renderer.addClass(this._wrapper, 'mda-wrapper');
        for (const className of [..._wrapClasses, ..._wrapStatuses]) {
          this._renderer.addClass(this._wrapper, className);
        }
      } else {
        this._wrapper = this._renderer.createElement('span');
        this._renderer.addClass(this._wrapper, 'mda-wrapper');
        for (const className of [..._wrapClasses, ..._wrapStatuses]) {
          this._renderer.addClass(this._wrapper, className);
        }
        this._renderer.appendChild(this._component, this._wrapper);
        this._renderer.appendChild(this._wrapper, this._element);
        if (this._report) {
          this._renderer.appendChild(this._component, this._report);
        }
      }
    } else if (this._wrapper && !_hasWrapperClass) {
      this._renderer.removeAttribute(this._wrapper, 'class');
      this._wrapper = undefined;
    }

    // ###### Action
    this._normalizeAction();

    // ###### Sizing
    const _elementSize: string = this._elementRules.sizes.find((className: string) => this._element.classList.contains(className)) || '';
    if (this._label) {
      const _labelSize: string = this._elementRules.sizes
        .map((className: string) => this._elementRules.label.main + '--' + className.split('--')[1])
        .find((className: string) => this._label.classList.contains(className)) || '';
      if (_labelSize.split('--')[1] !== _elementSize.split('--')[1]) {
        const _labelSizeClass: string = this._elementRules.label.main + '--' + _elementSize.split('--')[1];
        (!!_elementSize) ? this._renderer.addClass(this._label, _labelSizeClass) : this._renderer.removeClass(this._label, _labelSize);
      }
    }
    if (this._wrapper) {
      const _wrapperSize: string = this._elementRules.sizes
        .find((className: string) => this._wrapper.classList.contains(className)) || '';
      if (_wrapperSize !== _elementSize) {
        (!!_elementSize) ? this._renderer.addClass(this._wrapper, _elementSize) : this._renderer.removeClass(this._wrapper, _wrapperSize);
      }
    }

    // ###### TYPE
    if (this._element.tagName === 'INPUT') {
      if (this._element.classList.contains('mda-input--email')) {
        this._renderer.setAttribute(this._element, 'type', 'email');
      } else if (this._element.classList.contains('mda-input--password')) {
        this._renderer.setAttribute(this._element, 'type', 'password');
      } else {
        this._renderer.setAttribute(this._element, 'type', this._elementOriginalType);
      }
    }
  }

  private _normalizeAction(): void {
    if (this._checkAction(this._element) && this._element.value) {
      this._renderer.addClass(this._element, ACTION);
      this._renderAssociates(WRAPPER, ACTION, ADD);
    } else {
      this._renderer.removeClass(this._element, ACTION);
      this._renderAssociates(WRAPPER, ACTION, REMOVE);
    }
  }

  private _getFormStatuses(classes?: Array<string>): void {
    if (this._isAngularForm) {
      for (const elementClass of classes) {
        if (elementClass === 'ng-valid' || elementClass === 'ng-invalid') {
          this.valid = (elementClass === 'ng-valid');
        }
        if (elementClass === 'ng-pristine' || elementClass === 'ng-dirty') {
          this.pristine = (elementClass === 'ng-pristine');
        }
        if (elementClass === 'ng-untouched' || elementClass === 'ng-touched') {
          this.touched = (elementClass === 'ng-touched');
        }
      }
    } else {
      this.valid = this._element.validity.valid;
      this.pristine = (this.pristine === undefined) ? true : this.pristine;
      this.touched = (this.touched === undefined) ? false : this.touched;
    }
  }

  private _errorFocusBehavior(): void {
    if (!this.valid && !this.pristine) {
      this._renderer.addClass(this._element, 'error');
      this._renderAssociates(LABEL, ERROR, ADD);
      this._renderAssociates(WRAPPER, ERROR, ADD);
      this._renderAssociates(REPORT, ERROR, ADD);
    } else {
      this._renderer.removeClass(this._element, 'error');
      this._renderAssociates(LABEL, ERROR, REMOVE);
      this._renderAssociates(WRAPPER, ERROR, REMOVE);
      this._renderAssociates(REPORT, ERROR, REMOVE);
    }
  }

  private _renderAssociates(elementType: AssociateElementType, className: ClassEvent, action: ClassAction): void {
    let _element: HTMLElement = null;
    switch (elementType) {
      case LABEL:
        _element = this._label;
        break;
      case REPORT:
        _element = this._report;
        break;
      case WRAPPER:
        _element = this._wrapper;
        break;
    }
    if (!!_element ) {
      (action === ADD) ? this._renderer.addClass(_element, className) : this._renderer.removeClass(_element, className);
    }
  }

  private _renderDirective(): void {
    this._normalizeElements();
    const _classes: Array<string> = Array.from(this._element.classList);
    this._isAngularForm = _classes.some((c: string) => c.includes('ng-'));
    this._getFormStatuses(_classes);
    this._setElementPlaceholder();
    this._disabled$.next(this._element.disabled);
    if (!this._element.disabled) {
      if (this.valid) {
        this._renderer.removeClass(this._element, ERROR);
        this._renderAssociates(LABEL, ERROR, REMOVE);
        this._renderAssociates(WRAPPER, ERROR, REMOVE);
        this._renderAssociates(REPORT, ERROR, REMOVE);
      } else if (!this.pristine) {
        this._renderer.addClass(this._element, ERROR);
        this._renderAssociates(LABEL, ERROR, ADD);
        this._renderAssociates(WRAPPER, ERROR, ADD);
        this._renderAssociates(REPORT, ERROR, ADD);
      }
    }
    if (this._element.tagName === 'INPUT' && this._wrapper) {
      fromEvent(this._wrapper, 'click').pipe(
        takeUntil(this._componentDestroyed$)
      ).subscribe((event: MouseEvent) => {
        if (!this._element.disabled && this._checkWrapper(event.target as HTMLElement)) {
          if (this._checkAction(this._element) && this._element.classList.contains(ACTION)) {
            this.clickIcon.emit(event);
          }
          // ## Doing this to set cursor on focus at the end of text:
          const _elementContent: string = this._element.value;
          this._element.value = '';
          this._element.value = _elementContent;
          this._element.focus();
        }
      });
    }
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes.error) {
        if (!this._reportContent) {
          let _reportContentTag: string = (this._report) ? this._report.textContent : '';
          _reportContentTag = (this.report) ? _reportContentTag : '';
          this._reportContent = this.report || _reportContentTag || '';
        }
        if (changes.error.currentValue && this._report) {
          this._report.textContent = changes.error.currentValue;
        } else if (!changes.error.currentValue && this._report) {
          this._report.textContent = this._reportContent;
          this._reportContent = '';
        }
      }
      if (changes.report) {
        if (this._report && changes.report.currentValue !== changes.report.previousValue && !this.error) {
          this._report.textContent = changes.report.currentValue;
        }
      }
    }
  }

  ngAfterViewInit(): void {
    if (this._success) {
      this._getAssociateElements();
      this._renderDirective();
    }
  }

  ngAfterViewChecked(): void {
    if (this.render && this._success) {
      this._renderDirective();
    }
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
    this._componentDestroyed$.unsubscribe();
  }
}
