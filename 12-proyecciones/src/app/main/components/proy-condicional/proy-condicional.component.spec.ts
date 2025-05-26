import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyCondicionalComponent } from './proy-condicional.component';

describe('ProyCondicionalComponent', () => {
  let component: ProyCondicionalComponent;
  let fixture: ComponentFixture<ProyCondicionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyCondicionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyCondicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
