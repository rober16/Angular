import { Component, OnInit } from '@angular/core';
import { HijoComponent } from '../hijo/hijo.component';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-padre',
  standalone: true,
  imports: [HijoComponent],
  templateUrl: './padre.component.html',
  styleUrl: './padre.component.css'
})

export class PadreComponent implements OnInit{
  mensajeParaHijo = '¡Hola desde el padre!';
  valorRecibidoNieto: number = 0;

  constructor(private comunicacionService: ComunicacionService) {}

  ngOnInit(): void {
    this.comunicacionService.valor$.subscribe((valor) => {
      this.valorRecibidoNieto = valor;
    });
  }  
}
