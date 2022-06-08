import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'nf-paginate',
  templateUrl: './nf-paginate.component.html',
  styleUrls: ['./nf-paginate.component.scss']
})
export class NfPaginateComponent implements OnInit {
  @Input() rows = 10;
  @Input() totalRecords = 1;

  @Output() changePage = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onChangePage(page: number): void {
    this.changePage.emit(page);
  }

  get _pages(): number {
    return Math.ceil(this.totalRecords / this.rows);
  }

}
