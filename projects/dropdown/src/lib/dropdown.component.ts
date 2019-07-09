import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { EventsService, StandardKeyValueObject, ToolService } from '@lunaeme/circe-core';


export interface DropdownOption {
  key: string;
  value: string;
  iconClass?: string;
  iconColor?: string;
  fontColor?: string;
}

@Component({
  selector: 'cc-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DropdownComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('dropdown') dropdownEl: ElementRef;
  @Input() menuStyle: boolean = false;
  @Input() iconTypeClass: string = 'mda-icon';
  @Input() options: Array<DropdownOption> = [];
  @Input() referenceElement: Element;
  @Input() referenceElementApply: boolean;

  @Output() optionSelected: EventEmitter<StandardKeyValueObject> = new EventEmitter();
  @Output() dropdownClickOutside: EventEmitter<undefined> = new EventEmitter();

  private _element: HTMLElement;
  private _elementClasses = {
    selected: 'suggestion--selected'
  };

  constructor(
    public tools: ToolService,
    public ev: EventsService,
    private _el: ElementRef<HTMLElement>,
    private _renderer: Renderer2
  ) {
    this._element = this._el.nativeElement;
    this.referenceElementApply = false;
  }

  private _deleteSelectedInHtmlCollection(htmlCollection: HTMLCollection): void {
    const _numberOfElements: number = htmlCollection.length;
    for (let i = 0; i < _numberOfElements; i++) {
      if (htmlCollection.item(i).classList.contains(this._elementClasses.selected)) {
        this._renderer.removeClass(htmlCollection.item(i), this._elementClasses.selected);
      }
    }
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (this.referenceElement && this.referenceElementApply) {
      const domReference: ClientRect | DOMRect = this.referenceElement.getBoundingClientRect();
      /**
       * rest #dropdown -> padding = 8px (x2) = 16
       * rest #dropdown -> border = 1px (x2) = 2
       */
      (this._element.children.item(0) as HTMLElement).style.width = (domReference.width - 16 - 2) + 'px';
      (this._element.children.item(0) as HTMLElement).style.minWidth = (domReference.width - 16 - 2) + 'px';
    }
  }

  public mouseGlobalAction(event: MouseEvent): void {
    this._deleteSelectedInHtmlCollection((event.target as HTMLElement).children);
  }

  public mouseEnterAction(event: MouseEvent): void {
    this._deleteSelectedInHtmlCollection((event.target as HTMLElement).parentNode.children);

    const target = event.target as HTMLElement;

    if (target.classList.contains('suggestion')) {
      this._renderer.addClass(event.target, this._elementClasses.selected);
    } else {
      this._renderer.addClass(target.parentElement, this._elementClasses.selected);
    }
  }

  public mouseOutAction(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (target.classList.contains('suggestion')) {
      this._renderer.removeClass(event.target, this._elementClasses.selected);
    } else {
      this._renderer.removeClass(target.parentElement, this._elementClasses.selected);
    }
  }

  public clickOutside(): void {
    this.dropdownClickOutside.emit();
  }

  ngOnDestroy(): void {}
}
