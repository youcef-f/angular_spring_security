import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableangMaterialComponent } from './tableang-material.component';

describe('TableangMaterialComponent', () => {
  let component: TableangMaterialComponent;
  let fixture: ComponentFixture<TableangMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableangMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableangMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
