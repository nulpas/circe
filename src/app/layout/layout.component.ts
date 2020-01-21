import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { MenuGroup } from '../_types/response.types';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToolService } from '@core/tool.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit, OnDestroy {
  public menu: Array<MenuGroup>;

  public readonly optionSelected: string;

  private _componentDestroyed$: Subject<undefined> = new Subject();

  constructor(
    public tools: ToolService,
    private _data: DataService,
    private _cd: ChangeDetectorRef,
    private _route: ActivatedRoute
  ) {
    this.optionSelected = _route.routeConfig.path;

    _data.getMenu().pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: Array<MenuGroup>) => {
      this.menu = r;
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
