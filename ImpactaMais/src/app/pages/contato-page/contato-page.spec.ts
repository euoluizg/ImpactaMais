import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoPage } from './contato-page';

describe('ContatoPage', () => {
  let component: ContatoPage;
  let fixture: ComponentFixture<ContatoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContatoPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContatoPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
