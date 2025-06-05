import { Injectable } from '@angular/core';
import { IProductosInfo } from '../models/i-productos-info';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CarritoResourceService {

  private readonly STORAGE_KEY_CARRITO = 'carrito';  
  private carrito: IProductosInfo[] = [];
  private carritoSubject = new BehaviorSubject<IProductosInfo[]>([]);
  
  constructor() {
    this.loadCarrito();
  }

  obtenerCarrito() {
    return this.carritoSubject.asObservable();
  }

  agregarProducto(producto: IProductosInfo): void {
    const existe = this.carrito.some(item => item.codBarra === producto.codBarra);

    if (!existe) {
      this.carrito.push(producto);
      this.saveCarrito();
      this.carritoSubject.next([...this.carrito]);
    } else {
      console.log(`El producto "${producto.nomProducto}" ya está en el carrito.`);
    }
  }  

  obtenerCodigosConcatenados(): string {
    return this.carrito.map(p => p.codBarra.toString()).join(',');
  }

  eliminarProducto(producto: IProductosInfo): void {
    this.carrito = this.carrito.filter(item => item.codBarra !== producto.codBarra);
    this.saveCarrito();
    this.carritoSubject.next([...this.carrito]);
  }

  obtenerCantidadProductos(): number {
    return this.carrito.length;
  }

  private loadCarrito(): void {
    const storedCarrito = sessionStorage.getItem(this.STORAGE_KEY_CARRITO);
    if (storedCarrito) {
      try {
        this.carrito = JSON.parse(storedCarrito);
        this.carritoSubject.next([...this.carrito]);
      } catch (error) {
        console.error('Error al parsear el carrito desde sessionStorage:', error);
        this.clearCarrito(); //  Función para limpiar el carrito y el sessionStorage
      }
    } else {
      this.carrito = []; // Inicializar si no hay datos en sessionStorage
      this.carritoSubject.next([]);
    }
  }

  private saveCarrito(): void {
    sessionStorage.setItem(this.STORAGE_KEY_CARRITO, JSON.stringify(this.carrito));
  } 

  existeProducto(codBarra: string): boolean {
    return this.carrito.some(item => item.codBarra === codBarra);
  }

  private clearCarrito() {
    this.carrito = [];
    this.carritoSubject.next([]);
    sessionStorage.removeItem(this.STORAGE_KEY_CARRITO);
  }
}