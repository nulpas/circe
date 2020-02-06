import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MenuGroup, MenuOption } from '../_types/response.types';
import { BehaviorSubject, Subject } from 'rxjs';
import { ToolService } from '@core/tool.service';
import { DataService } from '../_services/data/data.service';
import { ActivatedRoute } from '@angular/router';
import { OrderPipe } from '@core/external.elements';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentationComponent implements OnInit, OnDestroy {
  public menu: Array<MenuGroup>;
  public menuOptions: Array<MenuOption> = [];
  public optionSelected: string;
  public toSelectOption$: BehaviorSubject<undefined> = new BehaviorSubject(undefined);

  private _componentDestroyed$: Subject<undefined> = new Subject();

  constructor(
    public tools: ToolService,
    private _data: DataService,
    private _cd: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private _order: OrderPipe
  ) {
    this.toSelectOption$.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe(() => {
      this.optionSelected = _route.snapshot.firstChild.url[0].path;
    });

    _data.getMenu().pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: Array<MenuGroup>) => {
      this.menu = r;
      for (const group of r) {
        this.menuOptions = [...this.menuOptions, ...group.options.map((e: MenuOption) => ({ ...e, parent: group.id }))];
      }
      console.log(_order.transform(this.menuOptions, 'name', true));
      _cd.markForCheck();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
    this._componentDestroyed$.unsubscribe();
  }
}
