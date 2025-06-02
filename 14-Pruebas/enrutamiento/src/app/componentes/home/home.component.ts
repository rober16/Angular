import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{
  constructor(private router: Router) {}
  
  mensaje: string = 'Componente Home'

  ngOnInit(): void {
    this.mensaje = 'Componente on Init';
  }

  ngOnDestroy(): void {
    this.mensaje = 'Se elimino el componente';
  }

   goToAbout() {
    this.router.navigate(['/page/2']);
  }
}
