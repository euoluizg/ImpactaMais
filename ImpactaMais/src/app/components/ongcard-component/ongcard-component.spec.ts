import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardbigComponent } from './cardbig-component';

describe('CardbigComponent', () => {
  let component: CardbigComponent;
  let fixture: ComponentFixture<CardbigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardbigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardbigComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
