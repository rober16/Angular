import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProySimpleComponent } from './proy-simple.component';

describe('ProySimpleComponent', () => {
  let component: ProySimpleComponent;
  let fixture: ComponentFixture<ProySimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProySimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProySimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
