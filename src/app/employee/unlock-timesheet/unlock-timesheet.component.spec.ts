import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockTimesheetComponent } from './unlock-timesheet.component';

describe('UnlockTimesheetComponent', () => {
  let component: UnlockTimesheetComponent;
  let fixture: ComponentFixture<UnlockTimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnlockTimesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
