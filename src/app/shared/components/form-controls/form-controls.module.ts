import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NfDateComponent } from './nf-date/nf-date.component';
import { NfGroupComponent } from './nf-group/nf-group.component';
import { NfInputComponent } from './nf-input/nf-input.component';
import { NfLabelComponent } from './nf-label/nf-label.component';
import { NfSelectComponent } from './nf-select/nf-select.component';
import { NfTextareaComponent } from './nf-textarea/nf-textarea.component';
import { NfUploadComponent } from './nf-upload/nf-upload.component';
import { PollRadioComponent } from './poll-radio/poll-radio.component';
import { NfAutocompleteComponent } from './nf-autocomplete/nf-autocomplete.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  exports: [
    NfInputComponent,
    NfSelectComponent,
    NfGroupComponent,
    NfLabelComponent,
    NfUploadComponent,
    NfDateComponent,
    NfTextareaComponent,
    PollRadioComponent,
    NfAutocompleteComponent,
  ],
  declarations: [
    NfInputComponent,
    NfSelectComponent,
    NfGroupComponent,
    NfLabelComponent,
    NfUploadComponent,
    NfDateComponent,
    NfTextareaComponent,
    PollRadioComponent,
    NfAutocompleteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DpDatePickerModule,
    NgbModule
  ]
})
export class NfFormControlsModule { }
