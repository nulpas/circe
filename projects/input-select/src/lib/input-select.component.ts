import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectionStrategy,
  HostListener,
  AfterViewInit,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BoxModelService, BoxModelSwapObject, EventsService, StandardKeyValueObject } from '@lunaeme/circe-core';

@Component({
  selector: 'cc-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InputSelectComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() options: Array<StandardKeyValueObject> = [];
  @Input() control: FormControl;
  @Input() fontTextClass: string;
  @Input() width: string;

  public showDropdown: boolean;
  public readonly element: HTMLElement;

  constructor(
    public ev: EventsService,
    private _bm: BoxModelService,
    private _el: ElementRef<HTMLElement>,
    private _cd: ChangeDetectorRef
  ) {
    this.element = _el.nativeElement;
    this.fontTextClass = 'mda-fs__14';
    this.showDropdown = false;
  }

  @HostListener('keydown.tab') closeOptions(): void {
    this.showDropdown = false;
  }

  ngOnInit(): void {
    this.control.registerOnDisabledChange(() => {
      this._cd.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    if (this.width) {
      const _componentBM: BoxModelSwapObject = this._bm.getBoxModel('input-select__parent', 'horizontal');
      const _arrowBM: BoxModelSwapObject = this._bm.getBoxModel('input-select__arrow', 'horizontal');
      const _contentElement: Element = this.element.children.item(0).children.item(0).children.item(0);
      (_contentElement as HTMLElement).style.width = (_componentBM.boxModelAggregated - _arrowBM.boxModelAggregated + 11) + 'px';
    }
  }

  public showOptions(): void {
    if (!this.control.disabled) {
      this.showDropdown = !this.showDropdown;
    }
  }

  public selectOption(option: StandardKeyValueObject): void {
    this.control.setValue(option.value || option.key);
    this.showDropdown = false;
  }

  public deleteInput(): void {
    if (!this.control.disabled) {
      this.control.setValue('');
      this.showDropdown = false;
    }
  }

  ngOnDestroy(): void {}
}
