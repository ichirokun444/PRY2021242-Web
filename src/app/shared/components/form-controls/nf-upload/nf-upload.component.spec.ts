import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfUploadComponent } from './nf-upload.component';

describe('NfUploadComponent', () => {
  let component: NfUploadComponent;
  let fixture: ComponentFixture<NfUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NfUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
