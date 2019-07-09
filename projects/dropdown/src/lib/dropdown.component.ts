import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import {
  BoxModelService,
  EventsService,
  OptionDropdownIcon,
  OptionForSelect,
  OptionForMenu,
  ToolService
} from '@lunaeme/circe-core';
import { DropdownConfig, FromDropdownOption } from './dropdown.types';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'cc-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent implements OnInit, OnDestroy {
  /**
   * Required Inputs
   */
  @Input() options: Array<OptionForSelect | OptionForMenu> = [];

  /**
   * Optional Inputs
   */
  @Input() config: DropdownConfig;
  @Input() keyboardControl: Subject<KeyboardEvent> = new Subject();


  @Input() menuStyle: boolean = false;
  @Input() iconTypeClass: string = 'mda-icon';
  @Input() optionsTT: Array<any> = [];
  @Input() referenceElement: Element;
  @Input() referenceElementApply: boolean;

  @Output() optionSelected: EventEmitter<FromDropdownOption> = new EventEmitter();
  @Output() dropdownClickOutside: EventEmitter<undefined> = new EventEmitter();
  @Output() closeDropdown: EventEmitter<undefined> = new EventEmitter();

  /**
   * For internal use parameters:
   */
  public optionsInside: Array<FromDropdownOption> = [];

  /**
   * Configuration Parameters
   */
  public isMenu: boolean;
  public width: string;
  public left: string;
  public right: string;

  private _element: HTMLElement;
  private _elementClasses = {
    option: 'dropdown__option',
    selected: 'dropdown__option--selected'
  };

  private _keyboardSubscription: Subscription = new Subscription();
  private _optionToSelect: HTMLElement | null = null;
  private _optionRemoveStyle: Subject<HTMLElement> = new Subject();
  private _optionAddStyle: Subject<HTMLElement> = new Subject();

  constructor(
    public tools: ToolService,
    public ev: EventsService,
    private _el: ElementRef<HTMLElement>,
    private _renderer: Renderer2,
    private _bm: BoxModelService
  ) {
    this._element = this._el.nativeElement;
    this.referenceElementApply = false;
  }

  private _processConfiguration(): void {
    this.isMenu = !!('menu' in this.config && this.config.menu);
    if ('width' in this.config && this.config.width) {
      this.width = (typeof this.config.width === 'string') ? this.config.width : `${this.config.width}px`;
    } else if ('elementReference' in this.config && this.config.elementReference) {
      const _elementReference: Element = this._bm.processElementForSpecialRules(this.config.elementReference);
      const _elementReferenceRect: ClientRect | DOMRect = _elementReference.getBoundingClientRect();
      if (!this.isMenu) {
        this.width = `${_elementReferenceRect.width}px`;
      } else {
        const _globalWidth: number = document.getElementsByTagName('html').item(0).offsetWidth;
        const _left = `${_elementReferenceRect.left}px`;
        const _right = `${_globalWidth - _elementReferenceRect.right}px`;
        if (typeof this.config.menu === 'object') {
          if ('left' in this.config.menu) {
            this.left = (typeof this.config.menu.left === 'boolean') ?
              (this.config.menu.left) ? _left : null :
              (typeof this.config.menu.left === 'string') ? this.config.menu.left : `${this.config.menu.left}px`;
          }
          if ('right' in this.config.menu) {
            this.right = (typeof this.config.menu.right === 'boolean') ?
              (this.config.menu.right) ? _right : null :
              (typeof this.config.menu.right === 'string') ? this.config.menu.right : `${this.config.menu.right}px`;
          }
          this.left = (this.left && this.right) ? null : this.left;
          if (!this.left && !this.right) {
            this.left = _left;
          }
        } else {
          this.left = _left;
        }

        console.log(this.left, this.right);
      }
    }
  }

  private _deleteSelectedInHtmlCollection(htmlCollection: HTMLCollection): void {
    Array.from(htmlCollection).forEach((e: HTMLElement) => {
      if (e.classList.contains(this._elementClasses.selected)) {
        this._renderer.removeClass(e, this._elementClasses.selected);
        this._optionAddStyle.next(e);
      }
    });
  }

  private _getAllOptions(): HTMLCollection {
    return this._element.getElementsByClassName(this._elementClasses.option);
  }

  private _getSelectedOption(): HTMLElement | null {
    let _output: HTMLElement | null = null;
    Array.from(this._getAllOptions()).forEach((e: HTMLElement) => {
      if (e.classList.contains(this._elementClasses.selected)) {
        _output =  e;
      }
    });
    return _output;
  }

  ngOnInit(): void {
    this.optionsInside = this.options.map((e: OptionForSelect | OptionForMenu) => {
      const id: string | number = ((e as OptionForSelect).value !== null && (e as OptionForSelect).value !== undefined) ?
        (e as OptionForSelect).value : (e as OptionForMenu).key;

      const _formatValue: string = ((e as OptionForSelect).value) ? ToolService.formatString(`${(e as OptionForSelect).value}`) : '';
      const _formatKey: string = ((e as OptionForMenu).key) ? ToolService.formatString(`${(e as OptionForMenu).key}`) : '';
      const label: string = e.label || _formatValue || _formatKey;

      const _color: {color?: string} = {};
      if (e.color) {
        _color.color = e.color;
      }

      const _icon: {icon?: OptionDropdownIcon} = {};
      if (e.icon) {
        _icon.icon = e.icon;
      }

      return { id, label, ..._color, ..._icon };
    });
    this._processConfiguration();

    this._keyboardSubscription = this.keyboardControl.subscribe((e: KeyboardEvent) => {
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
          this._renderer.removeClass(_selectedOption, this._elementClasses.selected);
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
          this._renderer.addClass(this._optionToSelect, this._elementClasses.selected);
          this._optionRemoveStyle.next(this._optionToSelect);
        }
      }
    });

    this._optionRemoveStyle.subscribe((element: HTMLElement) => {
      const _optionIcon: HTMLElement = element.getElementsByTagName('i').item(0);
      const _optionText: HTMLElement = element.getElementsByTagName('span').item(0);
      if (_optionIcon) {
        this._renderer.removeAttribute(_optionIcon, 'style');
      }
      this._renderer.removeAttribute(_optionText, 'style');
    });

    this._optionAddStyle.subscribe((element: HTMLElement) => {
      const _optionIcon: HTMLElement = element.getElementsByTagName('i').item(0);
      const _optionText: HTMLElement = element.getElementsByTagName('span').item(0);
      if (_optionIcon) {
        const _iconStyle: string = _optionIcon.getAttribute('data-style-temp');
        this._renderer.setAttribute(_optionIcon, 'style', _iconStyle);
      }
      const _textStyle: string = _optionText.getAttribute('data-style-temp');
      this._renderer.setAttribute(_optionText, 'style', _textStyle);
    });
  }

  public mouseGlobalAction(event: MouseEvent): void {
    this._deleteSelectedInHtmlCollection((event.target as HTMLElement).children);
  }

  public mouseEnterAction(event: MouseEvent): void {
    this._deleteSelectedInHtmlCollection((event.target as HTMLElement).parentNode.children);
    const _target: HTMLElement = ((event.target as HTMLElement).classList.contains(this._elementClasses.option)) ?
      event.target as HTMLElement : (event.target as HTMLElement).parentElement as HTMLElement;
    this._optionToSelect = _target;
    this._renderer.addClass(_target, this._elementClasses.selected);
    this._optionRemoveStyle.next(_target);
  }

  public mouseOutAction(event: MouseEvent): void {
    const _target: HTMLElement = ((event.target as HTMLElement).classList.contains(this._elementClasses.option)) ?
      event.target as HTMLElement : (event.target as HTMLElement).parentElement as HTMLElement;
    this._optionToSelect = null;
    this._renderer.removeClass(_target, this._elementClasses.selected);
    this._optionAddStyle.next(_target);
  }

  ngOnDestroy(): void {
    this._keyboardSubscription.unsubscribe();
    this.closeDropdown.emit();
  }
}
