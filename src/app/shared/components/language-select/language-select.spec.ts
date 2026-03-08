import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSelectComponent } from './language-select';

describe('LanguageSelectComponent', () => {
  let component: LanguageSelectComponent;
  let fixture: ComponentFixture<LanguageSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSelectComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
