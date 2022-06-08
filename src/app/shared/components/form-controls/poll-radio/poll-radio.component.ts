import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'nf-poll-radio',
  templateUrl: './poll-radio.component.html',
  styleUrls: ['./poll-radio.component.scss']
})
export class PollRadioComponent implements OnInit {
  @Input() options: any = [];
  @Input() value: string | number = '';
  @Output() valueChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedValue(val: string | number) {
    this.valueChange.emit(val);
  }

}
