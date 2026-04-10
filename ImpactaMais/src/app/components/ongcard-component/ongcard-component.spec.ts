import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngCardComponent } from './ongcard-component';

describe('OngCardComponent', () => {
  let component: OngCardComponent;
  let fixture: ComponentFixture<OngCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OngCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
