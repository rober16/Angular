import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-nieto',
  standalone: true,
  imports: [],
  templateUrl: './nieto.component.html',
  styleUrl: './nieto.component.css'
})
export class NietoComponent {
  constructor(private comunicacionService: ComunicacionService) {}

  @Input() valor: number = 0;
  @Output() valorCambio = new EventEmitter<number>();

  incrementar() {
    this.valor++;
    this.valorCambio.emit(this.valor);
    this.comunicacionService.enviarValor(this.valor);
  }

  decrementar() {
    this.valor--;
    this.valorCambio.emit(this.valor);
    this.comunicacionService.enviarValor(this.valor);
  }
}
