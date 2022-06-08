import { AfterViewInit, Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { DatePickerComponent } from 'ng2-date-picker';

@Component({
  selector: 'nf-date',
  templateUrl: './nf-date.component.html',
  styleUrls: ['./nf-date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NfDateComponent),
      multi: true
    }
  ]
})
export class NfDateComponent implements OnInit, AfterViewInit {
  @ViewChild('datepicker', { static: true }) datePicker!: DatePickerComponent;

  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  @Input() format = 'DD-MM-YYYY';
  @Input() mode: any = 'day';
  @Input() disabled = false;
  @Input() readonly = false;


  @Input() config: any = {};

  public propagateChange = (_: any) => { };
  public onTouched = (_: any) => { };

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.value = this.value;

    if (moment(this.value, this.format).isValid()) {
      this.datePicker.inputElementValue = this.value;
    }
  }

  onChangeValue(val: any): void {
    if (val == null) {
      this.propagateChange('');
      this.valueChange.emit('');
      return;
    }

    const date = moment(val).format(this.format);
    if (!date) {
      return;
    }

    this.value = date;
    this.propagateChange(this.value);
    this.valueChange.emit(this.value);
  }

  writeValue(value: string): void {
    this.datePicker.inputElementValue = value;
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
