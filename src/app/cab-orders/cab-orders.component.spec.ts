import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabOrdersComponent } from './cab-orders.component';

describe('CabOrdersComponent', () => {
  let component: CabOrdersComponent;
  let fixture: ComponentFixture<CabOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
