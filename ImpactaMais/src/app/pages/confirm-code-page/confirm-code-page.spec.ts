import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCodePage } from './confirm-code-page';

describe('ConfirmCodePage', () => {
  let component: ConfirmCodePage;
  let fixture: ComponentFixture<ConfirmCodePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmCodePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmCodePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
