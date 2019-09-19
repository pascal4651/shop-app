import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatestarsComponent } from './ratestars.component';

describe('RatestarsComponent', () => {
  let component: RatestarsComponent;
  let fixture: ComponentFixture<RatestarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatestarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatestarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
