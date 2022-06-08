import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfTextareaComponent } from './nf-textarea.component';

describe('NfTextareaComponent', () => {
  let component: NfTextareaComponent;
  let fixture: ComponentFixture<NfTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NfTextareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
