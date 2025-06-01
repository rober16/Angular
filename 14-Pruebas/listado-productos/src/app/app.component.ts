import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  mostrarLista = true;

  productos = ['Laptop', 'Mouse', 'Teclado'];

  nuevoProducto = '';

  agregarProducto() {
    if (this.nuevoProducto.trim()) {
      this.productos.push(this.nuevoProducto);
      this.nuevoProducto = '';
    }
  }

  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
  }
}
