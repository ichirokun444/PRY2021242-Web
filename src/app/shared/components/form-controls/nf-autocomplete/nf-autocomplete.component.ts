import { AfterViewInit, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'nf-autocomplete',
  templateUrl: './nf-autocomplete.component.html',
  styleUrls: ['./nf-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NfAutocompleteComponent),
      multi: true
    }
  ]
})
export class NfAutocompleteComponent implements OnInit, AfterViewInit {
  @Input() data: any = [];
  @Input() key = 'label';
  @Input() keyOutput = 'value';
  @Input() placeholder = 'Seleccionar';


  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();
  @Input() disabled = false;
  @Input() readonly = false;

  model: any;
  public propagateChange = (_: any) => { };
  public onTouched = (_: any) => { };

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.value = this.value;
      this.model = (this.data || []).find((it: any) => String(it[this.keyOutput]) === String(this.value));
    }, 100);
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(
        term => term.length < 2
          ? []
          : this.data.filter((v: any) => v[this.key].toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  iFormatter = (obj: any) => obj[this.key];

  onChangeValue(event?: any): void {
    if (!event) {
      this.propagateChange(null);
      if (this.valueChange.observers.length) {
        this.valueChange.emit('');
      }
      return;
    }

    const value = event[this.keyOutput] || this.model[this.keyOutput];
    this.propagateChange(value);
    if (this.valueChange.observers.length) {
      this.valueChange.emit(value);
    }
  }


  writeValue(value: string): void {
    this.value = value ?? '';
    this.ngAfterViewInit();
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
