import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-proy-condicional',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './proy-condicional.component.html',
  styleUrl: './proy-condicional.component.css'
})
export class ProyCondicionalComponent {

  @Input() tipo: number | undefined;

}
