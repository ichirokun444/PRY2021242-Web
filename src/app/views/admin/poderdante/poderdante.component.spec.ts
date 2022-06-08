import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoderdanteComponent } from './poderdante.component';

describe('PoderdanteComponent', () => {
  let component: PoderdanteComponent;
  let fixture: ComponentFixture<PoderdanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoderdanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoderdanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
