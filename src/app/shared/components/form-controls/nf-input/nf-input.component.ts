import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'nf-input',
  templateUrl: './nf-input.component.html',
  styleUrls: ['./nf-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NfInputComponent),
      multi: true
    }
  ]
})
export class NfInputComponent implements OnInit {
  @Input() disabled: boolean = false;

  @Input() value: string | number = '';
  @Input() placeholder = '';
  @Input() type: string = 'text';

  @Output() valueChange = new EventEmitter();

  public propagateChange = (_: any) => { };
  public onTouched = (_: any) => { };


  constructor() { }

  ngOnInit(): void {
    this.value = this.value ?? ('number' === this.type ? 0 : '');
  }


  // ControlValueAccessor
  onChangeValue(inputElement: EventTarget) { //  value: string | number
    this.value = (inputElement as HTMLInputElement)?.value ?? '';
    const inputValue = 'number' === this.type ? +this.value : this.value;
    this.propagateChange(inputValue);

    if (this.valueChange.observers.length) {
      this.valueChange.emit(inputValue);
    }
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

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }


}
