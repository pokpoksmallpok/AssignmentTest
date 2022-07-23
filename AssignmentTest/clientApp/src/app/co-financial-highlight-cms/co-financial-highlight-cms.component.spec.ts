import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoFinancialHighlightCmsComponent } from './co-financial-highlight-cms.component';

describe('CoFinancialHighlightCmsComponent', () => {
  let component: CoFinancialHighlightCmsComponent;
  let fixture: ComponentFixture<CoFinancialHighlightCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoFinancialHighlightCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoFinancialHighlightCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
