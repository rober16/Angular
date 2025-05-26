import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompTradicionalComponent } from './comp-tradicional.component';

describe('CompTradicionalComponent', () => {
  let component: CompTradicionalComponent;
  let fixture: ComponentFixture<CompTradicionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompTradicionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompTradicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
