import { Component, DoCheck, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'nf-textarea',
  templateUrl: './nf-textarea.component.html',
  styleUrls: ['./nf-textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NfTextareaComponent),
      multi: true
    }
  ]
})
export class NfTextareaComponent implements OnInit {
  @Input() disabled = false;
  @Input() value = '';

  @Output() valueChange = new EventEmitter();

  @Input() cols = 1;
  @Input() rows = 6;

  public propagateChange = (_: any) => { };
  public onTouched = (_: any) => { };

  constructor() { }

  ngOnInit(): void {
  }

  onChangeValue(str: string): void {
    this.value = str;
    this.propagateChange(this.value);
    this.valueChange.emit(this.value);
  }

  writeValue(value: string): void {
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
