import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompararPreciosComponent } from './comparar-precios.component';

describe('CompararPreciosComponent', () => {
  let component: CompararPreciosComponent;
  let fixture: ComponentFixture<CompararPreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompararPreciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompararPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
