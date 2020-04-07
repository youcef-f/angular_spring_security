
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAngularMaterialComponent } from './dashboard-angular-material.component';

describe('DashboardAngularMaterialComponent', () => {
  let component: DashboardAngularMaterialComponent;
  let fixture: ComponentFixture<DashboardAngularMaterialComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAngularMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAngularMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
