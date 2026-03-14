import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCodePage } from './send-code-page';

describe('SendCodePage', () => {
  let component: SendCodePage;
  let fixture: ComponentFixture<SendCodePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendCodePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendCodePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
