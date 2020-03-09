import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { DropdownConfig, FromDropdownOption } from './dropdown.types';
import { Subject, Subscription } from 'rxjs';
import {
  BoxModelService,
  EventsService,
  OptionDropdownIcon,
  OptionForDropdown,
  SelectDomElementHash,
  ToolService
} from '@lunaeme/circe-core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'cc-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent implements OnInit, OnDestroy, OnChanges {
  /**
   * Required Inputs
   */
  @Input() options: Array<OptionForDropdown> = [];

  /**
   * Optional Inputs
   */
  @Input() config: DropdownConfig;
  @Input() keyboardControl: Subject<KeyboardEvent> = new Subject();

  @Output() optionSelected: EventEmitter<FromDropdownOption> = new EventEmitter();
  @Output() closeDropdown: EventEmitter<undefined> = new EventEmitter();

  /**
   * For internal use parameters:
   */
  public optionsInside: Array<FromDropdownOption> = [];

  private _width: string;
  private _left: string;
  public right: string;
  public separators: Array<boolean>;
  public clickOutsideApply: boolean;

  private readonly _host: HTMLElement;
  private _hostClasses = {
    option: 'mda-dropdown__option',
    selected: 'dropdown__option--selected'
  };

  /**
   * Public configuration Parameters
   */
  private _autoPretty: boolean;

  private _keyboardSubscription: Subscription = new Subscription();
  private _optionToSelect: HTMLElement | null = null;
  private _optionRemoveStyle: Subject<HTMLElement> = new Subject();
  private _optionAddStyle: Subject<HTMLElement> = new Subject();
  private _componentDestroyed$: Subject<undefined> = new Subject();

  // @HostBinding('style.position') position: string = 'relative';

  constructor(
    public tools: ToolService,
    public ev: EventsService,
    private _el: ElementRef<HTMLElement>,
    private _renderer: Renderer2,
    private _bm: BoxModelService
  ) {
    this._host = this._el.nativeElement;
  }

  private _checkConfigArray(parameter: string): boolean {
    return this.config && parameter in this.config && Array.isArray(this.config[parameter]) && this.config[parameter].length;
  }

  private _generateOptionsInside(): void {
    this.optionsInside = this.options.map((e: OptionForDropdown) => {
      const id: string | number = e.value;

      const _formatValue: string = (e.value) ? this.tools.stringTransform(`${e.value}`) : '';
      const label: string = (this._autoPretty) ? e.label || _formatValue : e.label || e.value as string;

      const _color: {color?: string} = {};
      if (e.color) {
        _color.color = e.color;
      }

      const _icon: {icon?: OptionDropdownIcon} = {};
      if (e.icon) {
        _icon.icon = e.icon;
      }

      const _iconRight: {iconRight?: OptionDropdownIcon} = {};
      if (e.iconRight) {
        _iconRight.iconRight = e.iconRight;
      }

      return { id, label, ..._color, ..._icon, ..._iconRight };
    });
  }

  private _initializeConfiguration(): void {
    this._width = 'var(--mda-dropdown-default-width)';
    this._left = 'var(--mda-dropdown-default-left)';
  }

  private _getElementReference(config: DropdownConfig): Element {
    const _element: string | SelectDomElementHash = config.elementReferenceTest as string | SelectDomElementHash;
    let _output: Element = config.elementReferenceTest as Element || null;
    const _isSelectDomElementHash: boolean = (
      typeof _element === 'object' &&
      (Object.keys(_element).length === 2 || Object.keys(_element).length === 3) &&
      'name' in _element &&
      'type' in _element
    );
    if (typeof _element === 'string' || _isSelectDomElementHash) {
      _output = this._bm.getElement(_element);
    }
    return (_output) ? this._bm.processElementForSpecialRules(_output): _output;
  }

  private _processConfiguration(): void {
    this._initializeConfiguration();
    const _elementReference: Element = this._getElementReference(this.config);
    const _elementReferenceRect: ClientRect | DOMRect = (_elementReference) ? _elementReference.getBoundingClientRect() : null;

    const _hasWith: boolean = !!(this.config && 'width' in this.config && (this.config.width || this.config.width === 0));
    const _hasPosition: boolean = !!(this.config && 'position' in this.config && Object.keys(this.config.position).length);

    const _hasElementReference: boolean = !!(this.config && 'elementReference' in this.config && this.config.elementReference);
    // const _elementReference: Element = (_hasElementReference) ?
    //   this._bm.processElementForSpecialRules(this.config.elementReference) : null;


    if (_hasWith) {
      if (typeof this.config.width === 'string') {
        if (this.config.width[0] === '-' && this.config.width[1] === '-') {
          this._width = `var(${this.config.width})`;
        } else {
          this._width = this.config.width;
        }
      } else {
        this._width = `${this.config.width}px`;
      }
    } else if (_hasElementReference && _elementReferenceRect) {
      this._width = `${_elementReferenceRect.width}px`;
    }

    if (_hasPosition) {
      if (this.config.position.left || this.config.position.left === 0) {
        if (typeof this.config.position.left === 'string') {
          if (this.config.position.left[0] === '-' && this.config.position.left[1] === '-') {
            this._left = `var(${this.config.position.left})`;
          } else {
            this._left = this.config.position.left;
          }
        } else {
          this._left = `${this.config.position.left}px`;
        }
      }
    } else if (_hasElementReference && _elementReferenceRect) {
      this._left = `${_elementReferenceRect.left}px`;
    }

    // if (_hasWith) {
    //   this.width = (typeof this.config.width === 'string') ? this.config.width : `${this.config.width}px`;
    // } else if (_hasElementReference && _elementReferenceRect) {
    //   this.width = `${_elementReferenceRect.width}px`;
    // }

    // if (_hasElementReference && _elementReferenceRect) {
    //   const _hostRect: ClientRect | DOMRect = this._host.getBoundingClientRect();
    //   const _left = `${_elementReferenceRect.left - _hostRect.left}px`;
    //   const _right = `${_hostRect.right - _elementReferenceRect.right}px`;
    //   if (typeof this.config.menu === 'object') {
    //     if ('left' in this.config.menu) {
    //       this.left = (typeof this.config.menu.left === 'boolean') ?
    //         (this.config.menu.left) ? _left : null :
    //         (typeof this.config.menu.left === 'string') ? this.config.menu.left : `${this.config.menu.left}px`;
    //     }
    //     if ('right' in this.config.menu) {
    //       this.right = (typeof this.config.menu.right === 'boolean') ?
    //         (this.config.menu.right) ? _right : null :
    //         (typeof this.config.menu.right === 'string') ? this.config.menu.right : `${this.config.menu.right}px`;
    //     }
    //     this.left = (this.left && this.right) ? null : this.left;
    //     if (!this.left && !this.right) {
    //       this.left = _left;
    //     }
    //   } else {
    //     this.left = _left;
    //   }
    // }

    const _configSeparators = (this._checkConfigArray('separators')) ? this.config.separators : [];
    this.separators = this.options.map((e: unknown, i: number) => _configSeparators.includes(i + 1));

    this.clickOutsideApply = (this.config.clickOutsideApply === undefined) ? true : this.config.clickOutsideApply;

    this._autoPretty = ('autoPrettyLabels' in this.config) ? this.config.autoPrettyLabels : false;

    // const width: string = (this.width) ? this.width : 'var(--mda-dropdown-default-width)';
    // const left: string = (this.left) ? this.left : 'var(--mda-dropdown-default-left)';
    // const right: string = (this.right) ? this.right : 'var(--mda-dropdown-default-right)';
    // this._renderer.setStyle(this._host, 'width', width);
    // this._renderer.setStyle(this._host, 'min-width', width);
    // this._renderer.setStyle(this._host, 'left', left);
    // this._renderer.setStyle(this._host, 'right', right);

    const _dropdownElement: HTMLElement = this._host.getElementsByClassName('mda-dropdown').item(0) as HTMLElement;
    _dropdownElement.style.width = this._width;
    _dropdownElement.style.left = this._left;

    console.log('POLLO LOCO', _elementReferenceRect);
  }

  private _deleteSelectedInHtmlCollection(htmlCollection: HTMLCollection): void {
    for (const element of Array.from(htmlCollection)) {
      if (element.classList.contains(this._hostClasses.selected)) {
        this._renderer.removeClass(element, this._hostClasses.selected);
        this._optionAddStyle.next(element as HTMLElement);
      }
    }
  }

  private _getAllOptions(): HTMLCollection {
    return this._host.getElementsByClassName(this._hostClasses.option);
  }

  private _getSelectedOption(): HTMLElement | null {
    let _output: HTMLElement | null = null;
    Array.from(this._getAllOptions()).forEach((e: HTMLElement) => {
      if (e.classList.contains(this._hostClasses.selected)) {
        _output =  e;
      }
    });
    return _output;
  }

  public _getEventMouseTarget(event: MouseEvent): HTMLElement | null {
    let _target: HTMLElement = null;
    if ((event.target as HTMLElement).classList.contains(this._hostClasses.option)) {
      _target = (event.target as HTMLElement);
    } else if ((event.target as HTMLElement).parentElement.classList.contains(this._hostClasses.option)) {
      _target = (event.target as HTMLElement).parentElement;
    } else if ((event.target as HTMLElement).parentElement.parentElement.classList.contains(this._hostClasses.option)) {
      _target = (event.target as HTMLElement).parentElement.parentElement;
    }
    return _target;
  }

  ngOnInit(): void {
    this._processConfiguration();
    this._generateOptionsInside();

    this._keyboardSubscription = this.keyboardControl.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        this.closeDropdown.emit();
      }
      if (e.key === 'Escape') {
        this.ev.preventNoNeededEvent(e);
        this.closeDropdown.emit();
      }
      if (e.key === 'Enter') {
        if (this._optionToSelect) {
          const _option: FromDropdownOption = this.optionsInside.filter((el: FromDropdownOption) => {
            return el.label === this._optionToSelect.getElementsByTagName('span').item(0).innerText;
          })[0];
          this.optionSelected.emit(_option);
        }
      }
      if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
        this.ev.preventNoNeededEvent(e);
        const _isDownKey: boolean = (e.key === 'ArrowDown');
        const _allOptions: HTMLCollection = this._getAllOptions();
        const _selectedOption: HTMLElement = this._getSelectedOption();
        const _firstOption: HTMLElement = _allOptions.item(0) as HTMLElement;
        const _lastOption: HTMLElement = _allOptions.item(_allOptions.length - 1) as HTMLElement;
        if (!_selectedOption) {
          this._optionToSelect = (_isDownKey) ? _firstOption : _lastOption;
        } else {
          this._renderer.removeClass(_selectedOption, this._hostClasses.selected);
          this._optionAddStyle.next(_selectedOption);
          if (_isDownKey) {
            this._optionToSelect = (_selectedOption.nextElementSibling) ?
              _selectedOption.nextSibling as HTMLElement : null;
          } else {
            this._optionToSelect = (_selectedOption.previousElementSibling) ?
              _selectedOption.previousSibling as HTMLElement : null;
          }
        }
        if (this._optionToSelect) {
          this._renderer.addClass(this._optionToSelect, this._hostClasses.selected);
          this._optionRemoveStyle.next(this._optionToSelect);
        }
      }
    });

    this._optionRemoveStyle.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((element: HTMLElement) => {
      const _optionIcon: HTMLElement = element.getElementsByTagName('i').item(0);
      const _optionText: HTMLElement = element.getElementsByTagName('span').item(0);
      if (_optionIcon) {
        this._renderer.removeAttribute(_optionIcon, 'style');
      }
      if (_optionText) {
        this._renderer.removeAttribute(_optionText, 'style');
      }
    });

    this._optionAddStyle.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((element: HTMLElement) => {
      // const _optionIcon: HTMLElement = element.getElementsByTagName('i').item(0);
      const _optionIcon: HTMLElement = element.querySelector('.mda-dropdown--left > I');
      const _optionText: HTMLElement = element.getElementsByTagName('span').item(0);
      const _optionIconRight: HTMLElement = element.querySelector('.mda-dropdown--right > I');
      if (_optionIcon) {
        const _iconStyle: string = _optionIcon.getAttribute('data-style-temp');
        this._renderer.setAttribute(_optionIcon, 'style', _iconStyle);
      }
      if (_optionText) {
        const _textStyle: string = _optionText.getAttribute('data-style-temp');
        this._renderer.setAttribute(_optionText, 'style', _textStyle);
      }
      if (_optionIconRight) {
        const _iconRightStyle: string = _optionText.getAttribute('data-style-temp');
        this._renderer.setAttribute(_optionIconRight, 'style', _iconRightStyle);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      this._generateOptionsInside();
    }
    if (changes.config) {
      this._processConfiguration();
    }
  }

  public mouseGlobalAction(event: MouseEvent): void {
    this._deleteSelectedInHtmlCollection((event.target as HTMLElement).children);
  }

  public mouseEnterAction(event: MouseEvent): void {
    // this._deleteSelectedInHtmlCollection((event.target as HTMLElement).parentNode.children);
    this._optionToSelect = this._getEventMouseTarget(event);
    this._renderer.addClass(this._optionToSelect, this._hostClasses.selected);
    this._optionRemoveStyle.next(this._optionToSelect);
  }

  public mouseOutAction(event: MouseEvent): void {
    const _target: HTMLElement = this._getEventMouseTarget(event);
    this._optionToSelect = null;
    this._renderer.removeClass(_target, this._hostClasses.selected);
    this._optionAddStyle.next(_target);
  }

  ngOnDestroy(): void {
    this._keyboardSubscription.unsubscribe();
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
    this._componentDestroyed$.unsubscribe();
    this.closeDropdown.emit();
  }
}
