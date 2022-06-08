import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfSelectComponent } from './nf-select.component';

describe('NfSelectComponent', () => {
  let component: NfSelectComponent;
  let fixture: ComponentFixture<NfSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NfSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
