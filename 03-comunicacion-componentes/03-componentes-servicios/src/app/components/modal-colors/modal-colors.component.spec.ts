import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalColorsComponent } from './modal-colors.component';

describe('ModalColorsComponent', () => {
  let component: ModalColorsComponent;
  let fixture: ComponentFixture<ModalColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalColorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
