import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetaNgContainerComponent } from './etiqueta-ng-container.component';

describe('EtiquetaNgContainerComponent', () => {
  let component: EtiquetaNgContainerComponent;
  let fixture: ComponentFixture<EtiquetaNgContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetaNgContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtiquetaNgContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
