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
import {
  DataConfig,
  DropdownRowContent,
  IconActionObject,
  SelectionTypeDataObject,
  TableConfig,
  WithAddsObject,
  IconActionEvent
} from './table.types';
import { EventsService, ToolService } from '@lunaeme/circe-core';
import { OrderPipe } from 'ngx-order-pipe';
import { BehaviorSubject } from 'rxjs';
import { isEqual as _isEqual } from 'lodash';

@Component({
  selector: 'cc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TableComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dataSet: Array<any>;
  @Input() config: TableConfig;
  @Input() set radioColumns(value: any) {
    this.radioColumnsInside = value;
  }
  @Input() set checkboxColumns(value: Array<any>) {
    this.checkboxColumnsInside = value;
  }
  @Input() selectColumnsInput: any;
  @Input() createSelectColumnsInput: boolean = true;
  @Input() textOnUndefined: string | Array<string>;
  @Input() textOnNull: Array<string>;
  @Input() errorMessages: string;
  @Output() selectColumns: EventEmitter<any> = new EventEmitter();
  @Output() createSelectColumns: EventEmitter<boolean> = new EventEmitter();
  @Output() radioColumnsChange: EventEmitter<any> = new EventEmitter();
  @Output() checkboxColumnsChange: EventEmitter<Array<any>> = new EventEmitter();
  @Output() iconAction: EventEmitter<IconActionEvent> = new EventEmitter();

  public getValueFromDotedKey: (a: any, b: DataConfig) => any;
  public objectKeys = Object.keys;
  public columnsTemplate: string;
  public radioColumnsInside: any = {};
  public checkboxColumnsInside: Array<any> = [];
  public selectColumnsInside: any = {};
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
    if (changes.dataSet) {
      if (changes.dataSet.currentValue && changes.dataSet.currentValue.length) {
        if (this.createSelectColumnsInput && this.config && Object.keys(this.config).length) {
          this.config.tableData.forEach((config: DataConfig) => {
            if (config.type === 'select') {
              (this.selectColumnsInside[config.param] as any) = {};
              this.dataSet.forEach((row: any) => {
                this.selectColumnsInside[config.param][row[config.sourceOptions.selectKeyIdentification]] = ({
                  key: row[config.sourceOptions.selectKeyIdentification],
                  selection: row[config.sourceOptions.default.param],
                  selectionSource: row[config.sourceOptions.param].map((e: string) => {
                    const _auxValue: string = (e === 'Auto') ? 'AUTO' : ToolService.formatString(e).toUpperCase();
                    return { key: e, value: _auxValue };
                  })
                } as SelectionTypeDataObject);
              });
            }
          });
        }
      }
    }
    if (changes.config && Object.keys(changes.config).length) {
      this.columnsTemplate = this.setColumnsTemplate();
    }
    if (changes.selectColumnsInput && changes.selectColumnsInput.currentValue) {
      this.selectColumnsInside = changes.selectColumnsInput.currentValue;
      this.createSelectColumnsInput = false;
      this.createSelectColumns.emit(this.createSelectColumnsInput);
    }
    if (changes.createSelectColumnsInput && changes.createSelectColumnsInput.currentValue) {
      this.createSelectColumnsInput = changes.createSelectColumnsInput.currentValue;
      this.createSelectColumns.emit(this.createSelectColumnsInput);
    }
  }

  public hideSelectors(event: any) {
    (event as MouseEvent).stopPropagation();
    if (this.config.selection) {
      this.viewSelector.next(this.viewSelector.getValue().map(() => false));
    }
  }

  public showSelector(event: any, index: number) {
    (event as MouseEvent).stopPropagation();
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
    // this.radioColumns.emit(this.radioColumnsInside);
    this.radioColumnsChange.emit(this.radioColumnsInside);
  }

  public selectionAction(event: any, row: any): void {
    (event as MouseEvent).stopPropagation();
    const _selectElement: any = (this.config.selection.fieldToSelect) ?
      row[this.config.selection.fieldToSelect] :
      row;
    if (this.checkboxColumnsInside.indexOf(_selectElement) > -1) {
      this.checkboxColumnsInside.splice(this.checkboxColumnsInside.indexOf(_selectElement), 1);
    } else {
      this.checkboxColumnsInside.push(_selectElement);
    }
    this.checkboxColumnsChange.emit(this.checkboxColumnsInside);
  }

  public selectColumnAction(row: any, configCell: DataConfig, event: any): void {
    const _selectedValue: string = ((event as MouseEvent).target as HTMLFormElement).value;
    const _column: string = configCell.param;
    const _field: string = row[configCell.sourceOptions.selectKeyIdentification];
    this.selectColumnsInside[_column][_field].selection = _selectedValue;
    this.selectColumns.emit(this.selectColumnsInside);
  }

  public checkSelection(objectToCheck: any): boolean {
    const _toCheck: any = (this.config.selection.fieldToSelect) ?
      objectToCheck[this.config.selection.fieldToSelect] :
      objectToCheck;
    return !!(this.checkboxColumnsInside && this.checkboxColumnsInside.filter(e => _isEqual(e, _toCheck)).length);
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
