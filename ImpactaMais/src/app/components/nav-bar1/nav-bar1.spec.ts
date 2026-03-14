import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBar1 } from './nav-bar1';

describe('NavBar1', () => {
  let component: NavBar1;
  let fixture: ComponentFixture<NavBar1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBar1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBar1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
