import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatosComponent } from './datos/datos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'manejo-errores';
}
