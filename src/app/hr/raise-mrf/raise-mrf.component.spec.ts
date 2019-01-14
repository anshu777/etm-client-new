import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseMrfComponent } from './raise-mrf.component';

describe('RaiseMrfComponent', () => {
  let component: RaiseMrfComponent;
  let fixture: ComponentFixture<RaiseMrfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiseMrfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseMrfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
