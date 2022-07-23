import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoFinancialHighlightDisplayComponent } from './co-financial-highlight-display.component';

describe('CoFinancialHighlightDisplayComponent', () => {
  let component: CoFinancialHighlightDisplayComponent;
  let fixture: ComponentFixture<CoFinancialHighlightDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoFinancialHighlightDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoFinancialHighlightDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
