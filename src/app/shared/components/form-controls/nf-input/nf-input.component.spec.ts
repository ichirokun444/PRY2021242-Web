import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfInputComponent } from './nf-input.component';

describe('NfInputComponent', () => {
  let component: NfInputComponent;
  let fixture: ComponentFixture<NfInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NfInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
