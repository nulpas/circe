import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventsService } from '@core/events/events.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent implements OnInit, OnDestroy, AfterViewInit {
  public tagSize: FormControl = new FormControl(1);
  public tagText: FormControl = new FormControl('Cool Tag');
  public tagType: FormControl = new FormControl(1);
  public tagStyle: FormControl = new FormControl(1);
  public tagInteractiveMode: FormControl = new FormControl(1);
  public tagIconAction: FormControl = new FormControl(false);
  public tagDisabled: FormControl = new FormControl(false);

  public triggerMarquee: string;

  private _element: HTMLElement;
  private _tagElement: HTMLElement;
  private _marqueeElement: HTMLElement;
  private _componentDestroyed: Subject<undefined> = new Subject();

  constructor(private _renderer: Renderer2, private _el: ElementRef<HTMLElement>, private _ev: EventsService) {
    this._element = _el.nativeElement;

    this.tagType.valueChanges.pipe(
      takeUntil(this._componentDestroyed)
    ).subscribe((r: number) => {
      if (r === 2) {
        this.tagStyle.setValue(1);
      }
    });

    this.tagDisabled.valueChanges.pipe(
      takeUntil(this._componentDestroyed)
    ).subscribe((r: boolean) => {
      (r) ?
        _renderer.addClass(this._tagElement, 'disabled') :
        _renderer.removeClass(this._tagElement, 'disabled');
    });
  }

  private _triggerAction(phrase: string) {
    if (!this.triggerMarquee) {
      this.triggerMarquee = phrase;
      this._renderer.addClass(this._marqueeElement, 'show');
      setTimeout(() => {
        this._renderer.removeClass(this._marqueeElement, 'show');
        this.triggerMarquee = '';
      }, 800);
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this._tagElement = this._element.getElementsByClassName('mda-tag').item(0) as HTMLElement;
    this._marqueeElement = this._element.getElementsByClassName('trigger-marquee').item(0) as HTMLElement;
  }

  public actionTag(event: MouseEvent) {
    this._ev.preventNeededEvent(event);
    if (this.tagType.value === 2 && !this.tagDisabled.value) {
      if (this.tagInteractiveMode.value === 1) {
        this._triggerAction('Action TAG triggered...');
      } else if (this.tagInteractiveMode.value === 2) {
        const _isSelected: boolean = (event.target as HTMLElement).classList.contains('selected');
        (_isSelected) ?
          this._renderer.removeClass(event.target, 'selected') :
          this._renderer.addClass(event.target, 'selected');
      }
    }
  }

  public actionIcon(event: MouseEvent) {
    this._ev.preventNoNeededEvent(event);
    if (!this.tagDisabled.value) {
      this._triggerAction('Action ICON triggered...');
    }
  }

  ngOnDestroy(): void {
    this._componentDestroyed.next();
    this._componentDestroyed.complete();
    this._componentDestroyed.unsubscribe();
  }
}
