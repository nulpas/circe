import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../_services/data/data.service';
import { takeUntil} from 'rxjs/operators';
import { concat, Subject } from 'rxjs';
import { Icon, IconSection, IconSectionsRequest } from '../../_types/response.types';
import { ToolService } from '@core/tool.service';
import { FormControl } from '@angular/forms';
import { EventsService } from '@core/events.service';
import { OrderConditionPipe } from '@core/order-condition/order-condition.pipe';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconsComponent implements OnInit, OnDestroy {
  public showStickyBox: boolean = false;
  public totalIcons: number = 0;
  public sections: Array<IconSection> = [];
  public icons: {[section: string]: Array<Icon>} = {};
  public iconsFilter: FormControl = new FormControl('');
  public showIconsContentCode: FormControl = new FormControl(false);

  private _sourceSections: Array<IconSection>;
  private _sourceIcons: Array<Icon>;
  private _componentDestroyed$: Subject<undefined> = new Subject();

  constructor(
    public tools: ToolService,
    private _data: DataService,
    private _order: OrderConditionPipe,
    private _cd: ChangeDetectorRef,
    private _ev: EventsService
  ) {
    concat(
      _data.getIconSections(),
      _data.getIcons()
    ).pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: IconSectionsRequest | Array<Icon>) => {
      if ((r as IconSectionsRequest).isIconSections) {
        this._sourceSections = _order.transform((r as IconSectionsRequest).iconSections, 'name', true);
      } else {
        this._sourceIcons = _order.transform(r, 'code', true);
        this.iconsDataForRender(this._sourceIcons);
      }
    });

    this.iconsFilter.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: string) => {
      let _searchTerm: string = r;
      if (r.charAt(0) === '\\') {
        _searchTerm = r.slice(1);
      }
      const _filteredSourceIcons: Array<Icon> = this._sourceIcons
        .filter((e: Icon) => e.code.includes(_searchTerm) || e.content.includes(_searchTerm));
      this.iconsDataForRender(_filteredSourceIcons);
    });
  }

  @HostListener('scroll', ['$event']) onScroll(event: Event) {
    const _scrollElement: HTMLElement = event.target as HTMLElement;
    this.showStickyBox = (_scrollElement.scrollTop > 0);
  }

  private iconsDataForRender(sourceIcons: Array<Icon>): void {
    this.icons = {};
    this.totalIcons = sourceIcons.length;
    for (const section of this._sourceSections) {
      const _sectionIcons: Array<Icon> = sourceIcons.filter((e: Icon) => e.sections && e.sections.includes(section.id));
      if (_sectionIcons.length) {
        this.icons[section.id] = _sectionIcons;
      }
    }
    const _visibleSections = Object.keys(this.icons);
    this.sections = this._sourceSections.filter((e: IconSection) => _visibleSections.includes(e.id));
    this._cd.markForCheck();
  }

  ngOnInit(): void {}

  public cleanFilter(event: MouseEvent) {
    this._ev.preventNoNeededEvent(event);
    this.iconsFilter.setValue('');
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
    this._componentDestroyed$.unsubscribe();
  }
}
