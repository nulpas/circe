import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { DropdownConfig, FromDropdownOption } from '@dropdown/dropdown.types';
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
export class DropdownComponent implements OnInit, OnDestroy {
  public dropdownOptions: Array<OptionForDropdown>;
  public dropdownConfig: DropdownConfig;

  public secondaryDropdownOptions: Array<OptionForDropdown>;
  public secondaryDropdownConfig: DropdownConfig;
  public showSecondaryDropdown: boolean;
  public showOptionSelected: boolean;
  public marquee: string;

  public dropdownSeparators: FormControl = new FormControl(false);
  public dropdownOptionColor: FormControl = new FormControl(false);
  public dropdownIconColor: FormControl = new FormControl(false);
  public dropdownOptionIconsLeft: FormControl = new FormControl(false);
  public dropdownOptionIconsRight: FormControl = new FormControl(false);
  public dropdownTriggerAction: FormControl = new FormControl(1);
  public dropdownCloseMode: FormControl = new FormControl(1);

  private readonly _host: HTMLElement;
  private readonly _dropdownOptionsIcons: Array<{ class: string; color?: string; }>;
  private _timeout: NodeJS.Timeout;
  private _clickOutsideApply: boolean;
  private _componentDestroyed$: Subject<undefined> = new Subject();

  constructor(private _el: ElementRef<HTMLElement>, private _cd: ChangeDetectorRef) {
    this._host = _el.nativeElement;
    this._clickOutsideApply = false;

    this.dropdownOptions = [
      { value: 1, label: 'Edit' },
      { value: 2, label: 'Rename' },
      { value: 7, label: 'Run' },
      { value: 3, label: 'Move' },
      { value: 4, label: 'Copy' },
      { value: 5, label: 'Paste' },
      { value: 6, label: 'Delete' }
    ];
    this.dropdownConfig = { clickOutsideApply: false };
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
      { value: 71, label: 'All Processes' },
      { value: 72, label: 'One by One' }
    ];
    this.secondaryDropdownConfig = {
      clickOutsideApply: this._clickOutsideApply,
      elementReference: {
        type: 'class',
        name: 'mda-dropdown__option-3',
        shadowElement: 'mda-dropdown--demo'
      },
      position: {
        right: true,
        top: true,
        corrections: {
          elementReferenceScroll: this._host,
          elementReferenceHorizontal: 'documentation-sidebar',
          elementReferenceVertical: { type: 'tag', name: 'header' },
          horizontal: -16,
          vertical: 18
        }
      }
    };
    this.showSecondaryDropdown = false;

    this.dropdownSeparators.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: boolean) => {
      if (r) {
        const _separators: Array<number> = [2, 3, 6];
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
        this.dropdownOptions = [
          ...this.dropdownOptions.map((e: OptionForDropdown) => {
            if (e.value === 6 || e.value === 7) {
              const _color: string = (e.value === 6) ? 'var(--mda-color-critical)' : 'var(--mda-color-action)';
              return { ...e, color: _color };
            }
            return e;
          })
        ];
        if (this.dropdownOptionIconsLeft.value) {
          this.dropdownOptions = this.dropdownOptions.map((e: OptionForDropdown, i: number) => {
            if (!e.icon) {
              e = { ...e, icon: this._dropdownOptionsIcons[i] };
            }
            return e;
          });
        }
      } else {
        this.dropdownOptions = [
          ...this.dropdownOptions.map((e: OptionForDropdown) => {
            if (e.value === 6 || e.value === 7) {
              delete e.color;
            }
            return e;
          })
        ];
      }
    });

    this.dropdownIconColor.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: boolean) => {
      if (r) {
        if (!this.dropdownOptionIconsLeft.value) {
          this.dropdownOptionIconsLeft.setValue(true);
        }
        this.dropdownOptionIconsLeft.disable({ emitEvent: false });
        this.dropdownOptions = this.dropdownOptions.map((e: OptionForDropdown) => {
          if (e.value === 6 || e.value === 7) {
            const _color: string = (e.value === 6) ? 'var(--mda-color-critical)' : 'var(--mda-color-action)';
            return { ...e, icon: { ...e.icon, color: _color } };
          }
          return e;
        });
      } else {
        this.dropdownOptionIconsLeft.enable({ emitEvent: false });
        this.dropdownOptions = this.dropdownOptions.map((e: OptionForDropdown) => {
          if (e.value === 6 || e.value === 7) {
            delete e.icon.color;
          }
          return e;
        });
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
        this.dropdownOptions = this.dropdownOptions.map((e: OptionForDropdown) => {
          if (!!e.iconRight) {
            delete e.iconRight;
          }
          return e;
        });
      }
    });

    this.dropdownTriggerAction.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: number) => {
      this.dropdownOptionIconsRight.enable();
      if (r === 3) {
        this.dropdownOptionIconsRight.setValue(true);
        this.dropdownOptionIconsRight.disable();
      }
    });

    this.dropdownCloseMode.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: number) => {
      this.secondaryDropdownConfig = { ...this.secondaryDropdownConfig, clickOutsideApply: (r === 2) };
    });
  }

  ngOnInit(): void {}

  public selectOption(event: FromDropdownOption) {
    if (this.dropdownCloseMode.value === 2) {
      this.closeDropdown();
    }
    this.showOptionSelected = false;
    this.marquee = '';
    if (event.id === 7 && this.dropdownTriggerAction.value === 3 && this.dropdownOptionIconsRight.value) {
      this.showSecondaryDropdown = !this.showSecondaryDropdown;
    } else {
      clearTimeout(this._timeout);
      this.showOptionSelected = true;
      this.marquee = `Selected option ${event.label} (ID: ${event.id})`;
      this._timeout = setTimeout(() => {
        this.showOptionSelected = false;
        this._cd.markForCheck();
      }, 3000);
    }
  }

  public closeDropdown(): void {
    this.showSecondaryDropdown = false;
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
    this._componentDestroyed$.unsubscribe();
  }
}
