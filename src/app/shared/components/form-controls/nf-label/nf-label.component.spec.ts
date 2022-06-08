import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfLabelComponent } from './nf-label.component';

describe('NfLabelComponent', () => {
  let component: NfLabelComponent;
  let fixture: ComponentFixture<NfLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NfLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
