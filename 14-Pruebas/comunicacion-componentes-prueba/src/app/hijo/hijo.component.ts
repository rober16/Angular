import { Component, Input } from '@angular/core';
import { NietoComponent } from '../nieto/nieto.component';

@Component({
  selector: 'app-hijo',
  standalone: true,
  imports: [NietoComponent],
  templateUrl: './hijo.component.html',
  styleUrl: './hijo.component.css'
})
export class HijoComponent {
  @Input() mensaje: string = '';
  valorNieto: number = 5;

   actualizarValorNieto(nuevoValor: number) {
    this.valorNieto = nuevoValor;
  }
}
