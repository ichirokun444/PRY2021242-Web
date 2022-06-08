import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfAutocompleteComponent } from './nf-autocomplete.component';

describe('NfAutocompleteComponent', () => {
  let component: NfAutocompleteComponent;
  let fixture: ComponentFixture<NfAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NfAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
