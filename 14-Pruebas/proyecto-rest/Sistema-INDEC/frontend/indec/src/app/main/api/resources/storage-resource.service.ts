import { Injectable } from '@angular/core';
import { ILocalidad } from '../models/i-localidad';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageResourceService {

  private readonly COD_IDIOMA_KEY = 'codIdioma';
  private readonly STORAGE_KEY_UBICACION = 'ubicacion';
  private readonly STORAGE_KEY_FILTRO = 'filtro';

  private ubicacion: ILocalidad | null = null; // Almacenar solo una ubicación
  private filtro: string | undefined; // Almacenar el producto a buscar

  private ubicacionSubject = new BehaviorSubject<ILocalidad | null>(null);
  private filtroSubject = new BehaviorSubject<string | null>(null);
  
  constructor() {
    this.loadUbicacion();
    this.loadFiltro();
  }

  setCodIdioma(value: number): void {
    sessionStorage.setItem(this.COD_IDIOMA_KEY, value.toString());
  }

  getCodIdioma(): number {
    return Number(sessionStorage.getItem(this.COD_IDIOMA_KEY)) || 1;
  }

  guardarFiltro(filtro: string): void {
    this.filtro = filtro;  // Guardar la ubicación directamente
    this.saveFiltro();
    this.filtroSubject.next(this.filtro);
  }

  guardarUbicacion(localidad: ILocalidad): void {
    this.ubicacion = localidad;  // Guardar la ubicación directamente
    this.saveUbicacion();
    this.ubicacionSubject.next(this.ubicacion);
  }

  private saveUbicacion(): void {
    if (this.ubicacion) { // Guardar solo si hay una ubicación definida
      sessionStorage.setItem(this.STORAGE_KEY_UBICACION, JSON.stringify(this.ubicacion));
    }
  }
  
  obtenerUbicacion() {
    return this.ubicacionSubject.asObservable();
  }
  
  private saveFiltro(): void {
    if (this.filtro) { // Guardar solo si hay una ubicación definida
      sessionStorage.setItem(this.STORAGE_KEY_FILTRO, this.filtro);
    }
  }
    
  obtenerFiltro() {
    return this.filtroSubject.asObservable();
  }
  
  private loadUbicacion(): void {
    const storedUbicacion = sessionStorage.getItem(this.STORAGE_KEY_UBICACION);
    if (storedUbicacion) {
      try {
        this.ubicacion = JSON.parse(storedUbicacion);
        this.ubicacionSubject.next(this.ubicacion);
      } catch (error) {
        console.error('Error al parsear la ubicación desde sessionStorage:', error);
        sessionStorage.removeItem(this.STORAGE_KEY_UBICACION); // Limpiar en caso de error
      }
    }
  }

  private loadFiltro(): void {
    const storedFiltro = sessionStorage.getItem(this.STORAGE_KEY_FILTRO);
    if (storedFiltro) {
      try {
        this.filtro = storedFiltro;
        this.filtroSubject.next(this.filtro);
      } catch (error) {
        console.error('Error al obtener el filtro desde sessionStorage:', error);
        sessionStorage.removeItem(this.STORAGE_KEY_FILTRO); // Limpiar en caso de error
      }
    }
  }
}
