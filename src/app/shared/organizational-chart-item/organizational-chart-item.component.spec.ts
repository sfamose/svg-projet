import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationalChartItemComponent } from './organizational-chart-item.component';

describe('OrganizationalChartItemComponent', () => {
  let component: OrganizationalChartItemComponent;
  let fixture: ComponentFixture<OrganizationalChartItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationalChartItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationalChartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
