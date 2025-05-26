import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiComponenteNg18Component } from './mi-componente-ng18.component';

describe('MiComponenteNg18Component', () => {
  let component: MiComponenteNg18Component;
  let fixture: ComponentFixture<MiComponenteNg18Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiComponenteNg18Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiComponenteNg18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
