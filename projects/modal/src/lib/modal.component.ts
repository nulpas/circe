import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { BoxModelService, BoxModelSwapObject, SizeObject } from '@lunaeme/circe-core';

@Component({
  selector: 'cc-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ModalComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() title: string;
  @Input() titleClass: string;
  @Input() titleBackground: boolean;
  @Input() closeButton: boolean;
  @Input() modalBackground: boolean;
  @Input() clickOutside: boolean = false;
  @Input() clickOutsideExceptions: Array<string> = [];
  @Input() fixed: string;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Output() confirm: EventEmitter<boolean> = new EventEmitter();

  public titleAddClass: any;

  private readonly _element: HTMLElement;

  constructor(private _el: ElementRef, private _bm: BoxModelService) {
    this._element = _el.nativeElement;
  }

  private _adjustContentBody(): void {
    const _modalContentBody: Element = this._bm.getElement('content__body');
    if (this._element.contains(_modalContentBody)) {
      const _contentHeader: BoxModelSwapObject = this._bm.getBoxModel('content__header');
      const _contentBody: BoxModelSwapObject = this._bm.getBoxModel('content__body');
      const _cssCalcHeight: string = `calc(100% - ${_contentHeader.boxModelAggregated}px + ${_contentBody.boxModelAdditions}px)`;
      (_modalContentBody as HTMLElement).style.height = _cssCalcHeight;
      (_modalContentBody as HTMLElement).style.minHeight = _cssCalcHeight;
    }
  }

  ngOnInit(): void {
    this.titleAddClass = {
      [this.titleClass]: !!this.titleClass
    };
  }

  ngAfterViewInit(): void {
    const _modalComponent: Element = document.getElementsByClassName('modal-component').item(0);
    const _modalCanvas: Element = document.getElementsByClassName('modal__canvas').item(0);
    if (this._element.contains(_modalComponent) && this._element.contains(_modalCanvas)) {
      const _modalComponentRect: DOMRect | ClientRect = _modalComponent.getBoundingClientRect();
      const _modalCanvasRect: DOMRect | ClientRect = _modalCanvas.getBoundingClientRect();
      const _fixed: SizeObject = this._bm.processSizeString(this.fixed);
      if (_fixed && Object.keys(_fixed)) {
        const _modalCanvasWidth: number = (_fixed.with.unit === '%') ?
          _modalComponentRect.width * _fixed.with.value / 100 : _fixed.with.value;
        const _modalCanvasHeight: number = (_fixed.height.unit === '%') ?
          _modalComponentRect.height * _fixed.height.value / 100 : _fixed.height.value;
        (_modalCanvas as HTMLElement).style.width = _modalCanvasWidth + 'px';
        (_modalCanvas as HTMLElement).style.minWidth = _modalCanvasWidth + 'px';
        (_modalCanvas as HTMLElement).style.height = _modalCanvasHeight + 'px';
        (_modalCanvas as HTMLElement).style.minHeight = _modalCanvasHeight + 'px';
        this._adjustContentBody();
      } else {
        const _modalCanvasMaxWidth: number = _modalComponentRect.width * 0.9;
        const _modalCanvasMaxHeight: number = _modalComponentRect.height * 0.9;
        if (_modalCanvasRect.width > _modalCanvasMaxWidth) {
          (_modalCanvas as HTMLElement).style.width = _modalCanvasMaxWidth + 'px';
          (_modalCanvas as HTMLElement).style.minWidth = _modalCanvasMaxWidth + 'px';
        }
        if (_modalCanvasRect.height > _modalCanvasMaxHeight) {
          console.log('shot', _modalCanvasRect.height, _modalCanvasMaxHeight);
          (_modalCanvas as HTMLElement).style.height = _modalCanvasMaxHeight + 'px';
          (_modalCanvas as HTMLElement).style.minHeight = _modalCanvasMaxHeight + 'px';
        }
      }
    }
  }

  ngOnDestroy(): void {}
}
