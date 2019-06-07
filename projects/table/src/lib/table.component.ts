import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { DataConfig, DropdownRowContent, IconActionObject, TableConfig, WithAddsObject, IconActionEvent } from './table.types';
import { EventsService, ToolService } from '@lunaeme/circe-core';
import { OrderPipe } from 'ngx-order-pipe';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TableComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dataSet: Array<any>;
  @Input() config: TableConfig;
  @Input() set checkboxColumns(value: Array<any>) {
    this.checkboxColumnsInside = value;
  }
  @Input() set radioColumns(value: any) {
    this.radioColumnsInside = value;
  }
  @Input() set selectColumns(value: any) {
    this.selectColumnsInside = value;
  }
  @Input() textOnUndefined: string | Array<string>;
  @Input() textOnNull: Array<string>;
  @Input() errorMessages: string;

  @Output() checkboxColumnsChange: EventEmitter<Array<any>> = new EventEmitter();
  @Output() radioColumnsChange: EventEmitter<any> = new EventEmitter();
  @Output() selectColumnsChange: EventEmitter<any> = new EventEmitter();
  @Output() iconAction: EventEmitter<IconActionEvent> = new EventEmitter();

  public getValueFromDotedKey: (a: any, b: DataConfig) => any;
  public objectKeys = Object.keys;

  public columnsTemplate: string;
  public checkboxColumnsInside: Array<any> = [];
  public radioColumnsInside: any = {};
  public selectColumnsInside: any = null;
  public viewSelector: BehaviorSubject<Array<boolean>> = new BehaviorSubject([]);

  public showTextOnUndefined$: BehaviorSubject<string> = new BehaviorSubject('');
  public showTextOnNull$: BehaviorSubject<string> = new BehaviorSubject('');

  private readonly _widthAdds: WithAddsObject;
  private readonly _glueForArrayValues: string;

  constructor(public tools: ToolService, public ev: EventsService, private _order: OrderPipe) {
    this._widthAdds = { dropdown: 0, selection: 0 };
    this._glueForArrayValues = ', ';
    this.getValueFromDotedKey = this._getValueFromDottedKey;
  }

  private _getValueFromDottedKey(object: any, config: DataConfig): any {
    let _output: any = ToolService.getValueFromMultiLevelObject(object, config.param);
    if (Array.isArray(_output)) {
      _output = _output.map((e: any) => {
        if (!config.isComplexArray && typeof e === 'string') {
          return e;
        }
        return e[config.isComplexArray.complexParam];
      });
    }
    return (Array.isArray(_output)) ? _output.join(this._glueForArrayValues) : _output;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataSet && changes.dataSet.currentValue && changes.dataSet.currentValue.length && !this.selectColumnsInside) {
      this.selectColumnsInside = {};
      this.config.tableData.forEach((e: DataConfig) => {
        if (e.type === 'select') {
          this.selectColumnsInside[e.param] = {};
        }
      });
    }
    if (changes.config && Object.keys(changes.config).length) {
      this.columnsTemplate = this.setColumnsTemplate();
    }
  }

  public hideSelectors() {
    if (this.config.selection) {
      this.viewSelector.next(this.viewSelector.getValue().map(() => false));
    }
  }

  public showSelector(index: number) {
    if (this.config.selection) {
      const _aux: Array<boolean> = this.viewSelector.getValue();
      _aux[index] = true;
      this.viewSelector.next(_aux);
    }
  }

  public orderBy(field: string, configIndex: number) {
    this.config.tableData = this.config.tableData.map(e => {
      return { ...e, showOrderArrow: false };
    });
    if (!this.config.tableData[configIndex].hasOwnProperty('orderDesc')) {
      this.config.tableData[configIndex].orderDesc = true;
    }
    this.config.tableData[configIndex].showOrderArrow = true;
    this.config.tableData[configIndex].orderDesc = !this.config.tableData[configIndex].orderDesc;
    this.dataSet = this._order.transform(this.dataSet, field, this.config.tableData[configIndex].orderDesc);
  }

  public radioAction(row: any, configCell: DataConfig): void {
    this.radioColumnsInside[configCell.id] = row[configCell.selection];
    this.radioColumnsChange.emit(this.radioColumnsInside);
    if (configCell.specialBehavior && configCell.specialBehavior.uncheckSelection && this.config.selection && this.checkSelection(row)) {
      this.selectionAction(row);
    }
  }

  public selectionAction(row: any): void {
    const _fieldToCompare: string = (this.config.selection.fieldToSelect) ?
      this.config.selection.fieldToSelect : this.config.selection.fieldToCompare;

    const _isSelectedPreviously: boolean = !!this.checkboxColumnsInside.filter((e: any) => {
      const _compare: string = (typeof e === 'string') ? e : e[_fieldToCompare];
      return _compare === row[_fieldToCompare];
    }).length;

    if (_isSelectedPreviously) {
      this.checkboxColumnsInside.splice(
        this.checkboxColumnsInside
          .map(e => {
            return (typeof e === 'string') ? e : e[_fieldToCompare];
          })
          .indexOf(row[_fieldToCompare]),
        1
      );
    } else {
      const _elementToSelect: any = (this.config.selection.fieldToSelect) ? row[this.config.selection.fieldToSelect] : row ;
      this.checkboxColumnsInside.push(_elementToSelect);

      if (this.config.selection && this.config.selection.uncheckRadio) {
        const _radioColumn: Array<DataConfig> = this.config.tableData
          .filter((e: DataConfig) => e.id === this.config.selection.uncheckRadioId);
        const _radioExists: boolean = !!(_radioColumn.length && _radioColumn.length === 1);
        if (_radioExists && this.radioColumnsInside[_radioColumn[0].id] === row[_radioColumn[0].selection]) {
          this.radioColumnsInside[_radioColumn[0].id] = '';
          this.radioColumnsChange.emit(this.radioColumnsInside);
        }
      }
    }
    this.checkboxColumnsChange.emit(this.checkboxColumnsInside);
  }

  public selectColumnAction(row: any, configCell: DataConfig, event: any): void {
    const _selectedValue: string = ((event as MouseEvent).target as HTMLFormElement).value;
    const _identification: string = row[configCell.selectOptions.selectKeyIdentification];
    this.selectColumnsInside[configCell.param][_identification] = {};
    configCell.selectOptions.fieldsForEvent.forEach((e: string) => {
      this.selectColumnsInside[configCell.param][_identification][e] = (e === configCell.selectOptions.value) ? _selectedValue : row[e];
    });
    this.selectColumnsChange.emit(this.selectColumnsInside);
  }

  public checkSelection(objectToCheck: any): boolean {
    const _toCheck: any = (this.config.selection.fieldToSelect) ?
      objectToCheck[this.config.selection.fieldToSelect] :
      objectToCheck[this.config.selection.fieldToCompare];

    return !!(this.checkboxColumnsInside && this.checkboxColumnsInside.filter(e => {
      const _compare: string = (typeof e === 'string') ? e : e[this.config.selection.fieldToCompare];
      return (_compare === _toCheck);
    }).length);
  }

  public selectionAll(): void {
    this.checkboxColumnsInside = (this.dataSet.length === this.checkboxColumnsInside.length) ?
      [] :
      this.dataSet.map(e => {
        return (this.config.selection.fieldToSelect) ? e[this.config.selection.fieldToSelect] : e;
      });
    this.checkboxColumnsChange.emit(this.checkboxColumnsInside);
  }

  public getSelectionAllIcon(): string {
    if (this.checkboxColumnsInside && this.checkboxColumnsInside.length) {
      return (this.dataSet.length === this.checkboxColumnsInside.length) ? 'icon-square-check selected' : 'icon-square-minus selected';
    }
    return 'icon-checkbox';
  }

  public showDropdown(index: number): void {
    if (!this.dataSet[index].hasOwnProperty('showDropdown')) {
      this.dataSet[index].showDropdown = false;
    }
    this.dataSet[index].showDropdown = !this.dataSet[index].showDropdown;
  }

  public showRestOfDropdown(index: number): void {
    if (!this.dataSet[index].hasOwnProperty('showRestOfDropdown')) {
      this.dataSet[index].showRestOfDropdown = false;
    }
    this.dataSet[index].showRestOfDropdown = !this.dataSet[index].showRestOfDropdown;
  }

  public showComplexParameter(index: number, param: string) {
    if (!this.dataSet[index].hasOwnProperty('show' + param)) {
      this.dataSet[index]['show' + param] = false;
    }
    this.dataSet[index]['show' + param] = !this.dataSet[index]['show' + param];
  }

  public getDataToDropdown(element: any): Array<Array<DropdownRowContent>> {
    const _output: Array<Array<DropdownRowContent>> = [];
    const _content: Array<DropdownRowContent> = (this.config.dropdownRow.content) ?
      this.config.dropdownRow.content :
      Object.keys(element[this.config.dropdownRow.param]).filter(e => {
        return (this.config.dropdownRow.exclusionParams.indexOf(e) === -1);
      }).map(e => {
        return { label: e, param: e };
      });
    const _sizeFloor: number = Math.floor(_content.length / 2);
    let _sizeArray1: number = _sizeFloor;
    if (_content.length % 2) {
      _sizeArray1 = _sizeFloor + 1;
    }
    _output.push(_content.slice(0, _sizeArray1));
    _output.push(_content.slice(_sizeArray1));
    return _output;
  }

  public formatLabel(label: string): string {
    return ToolService.formatString(label);
  }

  public dataType(data: any): boolean {
    return (typeof data === 'object');
  }

  public setColumnsTemplate(equals?: boolean): string {
    const _equals = equals || false;
    let _length: number = this.config.tableData.length;
    if (this.config.dropdownRow) {
      _length ++;
      this._widthAdds.dropdown = 5;
    }
    if (this.config.selection) {
      _length ++;
      this._widthAdds.selection = 4;
    }
    const _cellsWidth: string = (100 / _length) + '%';
    let _aux: Array<any> = this.config.tableData.map(e => {
      if (_equals) {
        return _cellsWidth;
      } else {
        let _modifier: number = 0;
        Object.keys(this._widthAdds).forEach((property: string) => {
          _modifier = _modifier + this._widthAdds[property];
        });
        return (e.widthColumn * (100 - _modifier) / 100) + '%';
      }
    });
    if (this.config.dropdownRow) {
      const _dropdownWidth: string = (_equals) ? _cellsWidth : this._widthAdds.dropdown + '%';
      _aux.push(_dropdownWidth);
    }
    if (this.config.selection) {
      const _selectionWidth: string = (_equals) ? _cellsWidth : this._widthAdds.selection + '%';
      _aux = [_selectionWidth, ..._aux];
    }
    return _aux.join(' ');
  }

  public restOfDropdownData(element: any): Array<DropdownRowContent> {
    let _output: Array<DropdownRowContent> = [];
    if (this.config.dropdownRow.content) {
      const _simpleContent: Array<string> = this.config.dropdownRow.content.map(e => e.param);
      _output = Object.keys(element[this.config.dropdownRow.param])
        .filter(e => {
          return (_simpleContent.indexOf(e) === -1);
        }).map(e => {
          return { label: e, param: e };
        });
    } else {
      _output = this.config.dropdownRow.exclusionParams
        .filter(e => {
          return (element[this.config.dropdownRow.param].hasOwnProperty(e));
        })
        .map(e => {
          return { label: e, param: e };
        });
    }
    return _output;
  }

  public getComplexParameterContent(paramValue: any): Array<any> {
    let _output: Array<any> = [];
    if (!Array.isArray(paramValue)) {
      _output.push(paramValue);
    } else {
      _output = paramValue;
    }
    return _output;
  }

  isVoidComplexParam(paramValue: any): boolean {
    return !Object.keys(paramValue).length;
  }

  public doIconAction(iconAction: IconActionObject, element: any): void {
    this.iconAction.emit({ type: iconAction.type, element });
  }

  ngOnDestroy(): void {
    this.viewSelector.unsubscribe();
    this.showTextOnUndefined$.unsubscribe();
    this.showTextOnNull$.unsubscribe();
  }
}
