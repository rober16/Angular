import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-mi-componente-ng18',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './mi-componente-ng18.component.html',
  styleUrl: './mi-componente-ng18.component.css'
})
export class MiComponenteNg18Component {

  mensaje: string = "¡Hola Mundo!";
  marcas: string[] = [];
  marcas$!: Observable<string[]>;
  mostrar: boolean = false;
  nombre!: string;
  nombreCtrl!: FormControl;

  ngOnInit(): void {
    this.marcas = ["Jeep", "Ford", "Fiat", "Citröen"];
    this.marcas$ = of(["Jeep", "Ford", "Fiat", "Citröen"]);
    this.nombreCtrl = new FormControl('', [Validators.required]);
  }

  ver(): void {
    this.mostrar = !this.mostrar;
  }

  get texto(): string {
    return this.mostrar ? "Ocultar" : "Mostrar";
  }

}

