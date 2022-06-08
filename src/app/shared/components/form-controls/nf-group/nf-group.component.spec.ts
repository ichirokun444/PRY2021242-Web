import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfGroupComponent } from './nf-group.component';

describe('NfGroupComponent', () => {
  let component: NfGroupComponent;
  let fixture: ComponentFixture<NfGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NfGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
