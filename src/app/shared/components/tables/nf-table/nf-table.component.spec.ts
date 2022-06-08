import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfTableComponent } from './nf-table.component';

describe('NfTableComponent', () => {
  let component: NfTableComponent;
  let fixture: ComponentFixture<NfTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NfTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
