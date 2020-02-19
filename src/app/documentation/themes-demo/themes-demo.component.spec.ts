import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesDemoComponent } from './themes-demo.component';

describe('ThemesDemoComponent', () => {
  let component: ThemesDemoComponent;
  let fixture: ComponentFixture<ThemesDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemesDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemesDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
