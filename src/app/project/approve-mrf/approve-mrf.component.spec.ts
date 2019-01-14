import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveMrfComponent } from './approve-mrf.component';

describe('ApproveMrfComponent', () => {
  let component: ApproveMrfComponent;
  let fixture: ComponentFixture<ApproveMrfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveMrfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveMrfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
