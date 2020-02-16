import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../_services/data/data.service';
import { takeUntil} from 'rxjs/operators';
import { concat, Subject } from 'rxjs';
import { Icon, IconSection, IconSectionsRequest } from '../../_types/response.types';
import { ToolService } from '@core/tool.service';
import { OrderPipe } from '@core/external.elements';

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

  private _sourceSections: Array<IconSection>;
  private _sourceIcons: Array<Icon>;
  private _componentDestroyed$: Subject<undefined> = new Subject();

  constructor(
    public tools: ToolService,
    private _data: DataService,
    private _order: OrderPipe,
    private _cd: ChangeDetectorRef
  ) {
    concat(
      _data.getIconSections(),
      _data.getIcons()
    ).pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: IconSectionsRequest | Array<Icon>) => {
      if ((r as IconSectionsRequest).isIconSections) {
        this._sourceSections = (r as IconSectionsRequest).iconSections;
        this._sourceSections = _order.transform(this._sourceSections, 'name');
      } else {
        this._sourceIcons = _order.transform(r, 'code');
        this.totalIcons = this._sourceIcons.length;
        for (const section of this._sourceSections) {
          const _sectionIcons: Array<Icon> = this._sourceIcons.filter((e: Icon) => e.sections && e.sections.includes(section.id));
          if (_sectionIcons.length) {
            this.icons[section.id] = _sectionIcons;
          }
        }
        const _visibleSections = Object.keys(this.icons);
        this.sections = this._sourceSections.filter((e: IconSection) => _visibleSections.includes(e.id));
      }
      _cd.markForCheck();
    });
  }

  @HostListener('scroll', ['$event']) onScroll(event: Event) {
    const _scrollElement: HTMLElement = event.target as HTMLElement;
    this.showStickyBox = (_scrollElement.scrollTop > 0);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
