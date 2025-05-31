import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PadreComponent } from './componentes/padre/padre.component';
import { EnvioDatosComponent } from './componentes/envio-datos/envio-datos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PadreComponent, EnvioDatosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  title: string = 'menu';
  mostrar: boolean = false;
  marcas: string[] = [];

  ngOnInit(): void {
    this.title = 'Menu';
    this.marcas = ['Toyota', 'Ford', 'Chevrolet'];  
  }

}



