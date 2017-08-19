import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarNosearchComponent } from './navbar-nosearch.component';

describe('NavbarNosearchComponent', () => {
  let component: NavbarNosearchComponent;
  let fixture: ComponentFixture<NavbarNosearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarNosearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarNosearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
