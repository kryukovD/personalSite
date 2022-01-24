import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySitesComponent } from './category-sites.component';

describe('CategorySitesComponent', () => {
  let component: CategorySitesComponent;
  let fixture: ComponentFixture<CategorySitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorySitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
