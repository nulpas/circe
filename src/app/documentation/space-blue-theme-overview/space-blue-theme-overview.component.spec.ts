import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceBlueThemeOverviewComponent } from './space-blue-theme-overview.component';

describe('SpaceBlueThemeOverviewComponent', () => {
  let component: SpaceBlueThemeOverviewComponent;
  let fixture: ComponentFixture<SpaceBlueThemeOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceBlueThemeOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceBlueThemeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
