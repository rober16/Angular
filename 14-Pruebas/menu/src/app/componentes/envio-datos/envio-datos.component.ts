import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-envio-datos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './envio-datos.component.html',
  styleUrl: './envio-datos.component.css'
})
export class EnvioDatosComponent {
  nombre: string = 'Roberto';
}
