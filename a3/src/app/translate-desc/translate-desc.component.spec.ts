import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateDescComponent } from './translate-desc.component';

describe('TranslateDescComponent', () => {
  let component: TranslateDescComponent;
  let fixture: ComponentFixture<TranslateDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateDescComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslateDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
