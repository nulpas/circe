import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {DropdownConfig, FromDropdownOption} from '@dropdown/dropdown.types';
import { OptionForDropdown } from '@core/_types/data.types';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent implements OnInit, OnDestroy, AfterViewInit {
  public dropdownOptions: Array<OptionForDropdown>;
  public dropdownConfig: DropdownConfig;

  public secondaryDropdownOptions: Array<OptionForDropdown>;
  public secondaryDropdownConfig: DropdownConfig;
  public showSecondaryDropdown: boolean;

  public dropdownSeparators: FormControl = new FormControl(false);
  public dropdownOptionColor: FormControl = new FormControl(false);
  public dropdownOptionIconsLeft: FormControl = new FormControl(false);
  public dropdownOptionIconsRight: FormControl = new FormControl(false);
  public dropdownTriggerAction: FormControl = new FormControl(1);

  private readonly _dropdownOptionsIcons: Array<{ class: string; color?: string; }>;
  private _componentDestroyed$: Subject<undefined> = new Subject();

  constructor() {
    this.dropdownOptions = [
      { value: 1, label: 'Edit' },
      { value: 2, label: 'Rename' },
      { value: 7, label: 'Run' },
      { value: 3, label: 'Move' },
      { value: 4, label: 'Copy' },
      { value: 5, label: 'Paste' }
    ];
    this.dropdownConfig = { clickOutsideApply: false, position: { corrections: { horizontal: 0 } } };
    this._dropdownOptionsIcons = [
      { class: 'icon-edit-3' },
      { class: 'icon-rename-column' },
      { class: 'icon-play' },
      { class: 'icon-move' },
      { class: 'icon-copy' },
      { class: 'icon-stop' },
      { class: 'icon-trash' }
    ];

    this.secondaryDropdownOptions = [
      { value: 1, label: 'All Processes' },
      { value: 2, label: 'One by One' }
    ];
    this.secondaryDropdownConfig = {};
    this.showSecondaryDropdown = false;

    this.dropdownSeparators.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: boolean) => {
      if (r) {
        const _separators: Array<number> = [2, 3];
        if (this.dropdownOptionColor.value) {
          _separators.push(this.dropdownOptions.length - 1);
        }
        this.dropdownConfig = { ...this.dropdownConfig, separators: _separators };
      } else {
        delete this.dropdownConfig.separators;
        this.dropdownConfig = { ...this.dropdownConfig };
      }
    });

    this.dropdownOptionColor.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: boolean) => {
      if (r) {
        this.dropdownOptions = [ ...this.dropdownOptions, { value: 6, label: 'Delete', color: 'red' } ];
        if (this.dropdownSeparators.value) {
          this.dropdownConfig = {
            ...this.dropdownConfig,
            separators: [...this.dropdownConfig.separators, (this.dropdownOptions.length - 1)]
          };
        }
        if (this.dropdownOptionIconsLeft.value) {
          this.dropdownOptions = this.dropdownOptions.map((e: OptionForDropdown, i: number) => {
            if (!e.icon) {
              e = { ...e, icon: this._dropdownOptionsIcons[i] };
            }
            return e;
          });
        }
      } else {
        this.dropdownOptions.pop();
        this.dropdownOptions = [ ...this.dropdownOptions ];
        if (this.dropdownConfig.separators) {
          this.dropdownConfig.separators.pop();
          this.dropdownConfig = { ...this.dropdownConfig };
        }
      }
    });

    this.dropdownOptionIconsLeft.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: boolean) => {
      if (r) {
        this.dropdownOptions = this.dropdownOptions.map((e: OptionForDropdown, i: number) => ({
          ...e, icon: this._dropdownOptionsIcons[i]
        }));
      } else {
        this.dropdownOptions = this.dropdownOptions.map((e: OptionForDropdown) => {
          delete e.icon;
          return e;
        });
      }
    });

    this.dropdownOptionIconsRight.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: boolean) => {
      if (r) {
        this.dropdownOptions = this.dropdownOptions
          .map((e: OptionForDropdown, i: number) => (i === 2) ? ({ ...e, iconRight: { class: 'icon-arrow2_right' } }) : e);
      } else {
        this.dropdownOptions = this.dropdownOptions.map((e: OptionForDropdown, i: number) => {
          if (!!e.iconRight) {
            delete e.iconRight;
          }
          return e;
        });
      }
    });
  }

  ngOnInit(): void {}

  public selectOption(event: FromDropdownOption) {
    if (event.id === 7) {
      this.showSecondaryDropdown = !this.showSecondaryDropdown;
    }
  }

  ngAfterViewInit(): void {
    this.secondaryDropdownConfig = {
      ...this.secondaryDropdownConfig,
      elementReference: document.querySelector('.mda-dropdown--demo .mda-dropdown__option-3')
    };

    console.log(this.secondaryDropdownConfig);
  }

  public clickOutside(): void {
    console.log('CLICK OUTSIDE');
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
    this._componentDestroyed$.unsubscribe();
  }
}
