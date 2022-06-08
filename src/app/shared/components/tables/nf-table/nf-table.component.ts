import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

enum TableHeaderType {
  string,
  number,
  url
}

export interface TableHeader {
  label: string;
  field: string;
  type?: keyof typeof TableHeaderType;
}

export interface TableControl {
  label?: string;
  icon?: string;
  svg?: string;
  disabled?: boolean;
  function: Function;
  style?: string;
}

@Component({
  selector: 'nf-table',
  templateUrl: './nf-table.component.html',
  styleUrls: ['./nf-table.component.scss']
})
export class NfTableComponent implements OnInit {
  @Input() header: TableHeader[] = [];
  @Input() data: any[] = [];
  @Input() controls: TableControl[] = [];
  // @Input('is-responsive') isResponsive: boolean | string = false;
  @Input('multi') multi: boolean | string = false;
  @Input() rowKey = 'id';
  @Input() emptyMessage = 'Tabla sin datos';
  @Input() loading = false;

  selectedIdx: number[] = [];
  selectedRows: any[] = [];

  @Output() selectedRow = new EventEmitter();
  @Output() selectedValues = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.multi = typeof this.multi === 'string';
    // this.isResponsive = typeof this.isResponsive === 'string';
    // console.log(this.isResponsive);
  }

  trackByFn(index: number, it: any): number {
    return index;
  }

  onSelectedRow(row: any, index: number): void {
    if (row.disabled) {
      return;
    }

    const idx = this.selectedIdx.findIndex(it => it === row[this.rowKey]);

    if (row[this.rowKey]) {
      this.updateSelectedRow(row);
    }

    if (idx !== -1) {
      this.selectedIdx.splice(idx, 1);
      this.selectedRow.emit(null);
      return;
    }

    if (!this.multi) {
      this.selectedIdx = [index];
      this.selectedRow.emit(row);
      return;
    }

    this.selectedIdx.push(row[this.rowKey]);
    this.selectedRow.emit(row);
  }

  isSelected(row: any, idx: number): boolean {
    if (row[this.rowKey]) {
      return this.selectedRows.includes(row);
    } else {
      return this.selectedIdx.includes(idx);
    }
  }

  updateSelectedRow(row: any) {
    if (!this.multi) {
      this.selectedValues.emit(row);
      return;
    }

    const index = this.selectedRows.findIndex(it => it[this.rowKey] === row[this.rowKey])

    if (index !== -1) {
      this.selectedRows.splice(index, 1);
    } else {
      this.selectedRows.push(row);
    }

    this.selectedValues.emit(this.selectedRows);
  }

  unselectByIndex(index: number): void {
    this.selectedIdx.splice(index, 1);
  }

  unselectById(id: number): void {
    const index = this.selectedIdx.findIndex(it => it === id);
    this.selectedIdx.splice(index, 1);
  }

  clearSelection(): void {
    this.selectedIdx = [];
    this.selectedRows = [];
    this.selectedValues.emit(this.selectedRows);
  }

  selectAll(): void {
    this.selectedIdx = [];
    this.selectedRows = [];

    this.selectedIdx = this.data.map((it, idx) => it[this.rowKey]);

    // const  = new Set(initialData.map(d => d.ID));
    const ids = this.selectedRows.map(i => i[this.rowKey]);
    const selectedAll = [...this.selectedRows, ...this.data.filter(d => !ids.includes(d[this.rowKey]))];
    this.selectedRows = selectedAll;

    this.selectedValues.emit(this.selectedRows);
  }

  selectValues(values: any): void {
    const ids = this.selectedRows.map(i => i[this.rowKey]);
    const selectedAll = [...this.selectedRows, ...values.filter(d => !ids.includes(d[this.rowKey]))];

    this.selectedRows = selectedAll;
    this.selectedIdx = this.selectedRows.map(it => it[this.rowKey]);

    this.selectedValues.emit(this.selectedRows);
  }

  getTable() {
    return document.getElementById('table');
  }

}
