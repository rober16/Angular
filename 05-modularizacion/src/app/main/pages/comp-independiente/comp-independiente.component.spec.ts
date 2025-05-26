import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompIndependienteComponent } from './comp-independiente.component';

describe('CompIndependienteComponent', () => {
  let component: CompIndependienteComponent;
  let fixture: ComponentFixture<CompIndependienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompIndependienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompIndependienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
