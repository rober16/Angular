import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-datos',
  standalone: true,
  imports: [],
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.css'
})
export class DatosComponent {
  constructor(/*private dataService: DataService*/) {}

  cargarDatos() {
    /*this.dataService.obtenerDatos().subscribe({
      next: (datos) => {
        console.log('Datos recibidos:', datos);
      },
      error: (error) => {
        console.error('Error en el componente:', error);
      },
    });*/
  }
  
}
