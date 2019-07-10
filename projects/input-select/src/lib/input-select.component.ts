import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectionStrategy,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventsService, OptionDropdownIcon, OptionForSelect, ToolService } from '@lunaeme/circe-core';
import { Subject, Subscription } from 'rxjs';
import { InputSelectConfig } from './input-select.types';
import { FromDropdownOption, keysToManageDropdown, keysToShowDropdown } from '@lunaeme/circe-dropdown';

@Component({
  selector: 'cc-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputSelectComponent implements OnInit, OnDestroy {
  /**
   * Required Inputs
   */
  @Input() options: Array<OptionForSelect> = [];
  @Input() control: FormControl = new FormControl();

  /**
   * Optional Inputs
   */
  @Input() config: InputSelectConfig = {};
  @Input() widthTT: string;

  /**
   * Configuration Parameters
   */
  public width: string;
  public removeValue: boolean;
  public showRemoveValue: boolean;
  public showControl: boolean;

  /**
   * Dropdown Configuration Parameters
   */
  public elementReference: Element;
  public dropdownKeyboardEvent: Subject<KeyboardEvent> = new Subject();
  public dropdownOptions: boolean;
  public keysToManageDropdown: Array<string>;
  public keysToShowDropdown: Array<string>;

  private readonly _element: HTMLElement;
  private _valueChangesSubscription: Subscription = new Subscription();

  constructor(public ev: EventsService, private _el: ElementRef<HTMLElement>, private _cd: ChangeDetectorRef) {
    this._element = _el.nativeElement;
    this.dropdownOptions = false;
    this.keysToManageDropdown = keysToManageDropdown;
    this.keysToShowDropdown = keysToShowDropdown;
  }

  ngOnInit(): void {
    this.options = this.options.map((e: OptionForSelect) => {
      const _icon: {icon?: OptionDropdownIcon} = {};
      if (e.icon) {
        _icon.icon = e.icon;
      }
      return {
        value: e.value,
        label: e.label || ToolService.formatString(`${e.value}`),
        ..._icon
      };
    });
    if ('width' in this.config && this.config.width >= 100) {
      this.width = `${this.config.width}px`;
    }
    this.removeValue = ('removeValue' in this.config) ? this.config.removeValue : true;
    this.showControl = ('showControl' in this.config) ? this.config.showControl : true;

    this.control.registerOnDisabledChange(() => {
      this._cd.markForCheck();
    });

    this.showRemoveValue = this.removeValue && (this.control.value !== null) && (this.control.value).toString().length;
    this._valueChangesSubscription = this.control.valueChanges.subscribe(() => {
      this.showRemoveValue = this.removeValue && (this.control.value !== null) && (this.control.value).toString().length;
    });

    this.elementReference = this._element.getElementsByClassName('input-select').item(0);
  }

  public showDropdown(): void {
    if (!this.control.disabled) {
      this.dropdownOptions = true;
    }
  }

  public hideDropdown(): void {
    if (!this.control.disabled) {
      this.dropdownOptions = false;
    }
  }

  public selectOption(option: FromDropdownOption): void {
    if (!this.control.disabled) {
      this.control.setValue(option.label);
      this.inputFocus();
    }
  }

  public inputFocus(): void {
    if (!this.control.disabled) {
      this._element.getElementsByTagName('input').item(0).focus();
      this.hideDropdown();
    }
  }

  public deleteValue(): void {
    if (!this.control.disabled) {
      this.control.setValue('');
      this.inputFocus();
    }
  }

  ngOnDestroy(): void {
    this._valueChangesSubscription.unsubscribe();
  }
}
