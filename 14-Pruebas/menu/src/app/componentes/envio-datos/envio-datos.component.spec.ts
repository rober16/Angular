import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioDatosComponent } from './envio-datos.component';

describe('EnvioDatosComponent', () => {
  let component: EnvioDatosComponent;
  let fixture: ComponentFixture<EnvioDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvioDatosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvioDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
