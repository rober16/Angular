import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyMultipleComponent } from './proy-multiple.component';

describe('ProyMultipleComponent', () => {
  let component: ProyMultipleComponent;
  let fixture: ComponentFixture<ProyMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyMultipleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
