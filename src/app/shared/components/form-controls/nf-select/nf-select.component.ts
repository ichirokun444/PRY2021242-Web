import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export interface Options {
  label: string;
  value: string | number;
  disabled?: boolean;
  [key: string]: any;
}

@Component({
  selector: 'nf-select',
  templateUrl: './nf-select.component.html',
  styleUrls: ['./nf-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NfSelectComponent),
      multi: true
    }
  ]
})
export class NfSelectComponent implements OnInit {
  @Input() defaultText = 'Seleccione una opción';

  @Input('no-text') noText: boolean | string = false;

  @Input() disabled = false;

  @Input() value: string | number = '';
  @Input() options: Options[] = [];

  @Output() valueChange = new EventEmitter();

  public propagateChange = (_: any) => { };
  public onTouched = (_: any) => { };


  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.noText = typeof this.noText === 'string';
  }

  selectedValue(value: string | number): void {
    this.value = value;
    this.propagateChange(this.value);
    this.valueChange.emit(this.value);
  }

  writeValue(value: string | number): void {
    this.value = value;
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
