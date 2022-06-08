import { Component, ContentChild, OnInit } from '@angular/core';
import { NfInputComponent } from '../nf-input/nf-input.component';
import { NfLabelComponent } from '../nf-label/nf-label.component';
import { NfSelectComponent } from '../nf-select/nf-select.component';

@Component({
  selector: 'nf-group',
  templateUrl: './nf-group.component.html',
  styleUrls: ['./nf-group.component.scss']
})
export class NfGroupComponent implements OnInit {
  @ContentChild(NfLabelComponent, { static: true }) labelControl?: NfLabelComponent;
  @ContentChild(NfInputComponent, { static: true }) inputControl?: NfInputComponent;
  @ContentChild(NfSelectComponent, { static: true }) selectControl?: NfSelectComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
