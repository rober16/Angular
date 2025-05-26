import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDescartarComponent } from './modal-descartar.component';

describe('ModalDescartarComponent', () => {
  let component: ModalDescartarComponent;
  let fixture: ComponentFixture<ModalDescartarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDescartarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDescartarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
