import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollRadioComponent } from './poll-radio.component';

describe('PollRadioComponent', () => {
  let component: PollRadioComponent;
  let fixture: ComponentFixture<PollRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
