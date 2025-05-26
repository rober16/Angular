import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-terminos',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './terminos.component.html',
  styleUrl: './terminos.component.css'
})
export class TerminosComponent {

  constructor(private _router: Router) { }

  aceptarTerminos() {
    localStorage.setItem('acepto', 'true');
    this._router.navigate(['/main']);
  }

}
