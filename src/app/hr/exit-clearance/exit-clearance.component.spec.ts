import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitClearanceComponent } from './exit-clearance.component';

describe('ExitClearanceComponent', () => {
  let component: ExitClearanceComponent;
  let fixture: ComponentFixture<ExitClearanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitClearanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitClearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
