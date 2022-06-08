import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfDateComponent } from './nf-date.component';

describe('NfDateComponent', () => {
  let component: NfDateComponent;
  let fixture: ComponentFixture<NfDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NfDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
