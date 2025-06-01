import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{
  mensaje: string = 'Componente Home'

  ngOnInit(): void {
    this.mensaje = 'Componente on Init';
  }

  ngOnDestroy(): void {
    this.mensaje = 'Se elimino el componente';
  }
}
