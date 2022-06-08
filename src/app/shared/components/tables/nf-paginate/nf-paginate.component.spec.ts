import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfPaginateComponent } from './nf-paginate.component';

describe('NfPaginateComponent', () => {
  let component: NfPaginateComponent;
  let fixture: ComponentFixture<NfPaginateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NfPaginateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfPaginateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
