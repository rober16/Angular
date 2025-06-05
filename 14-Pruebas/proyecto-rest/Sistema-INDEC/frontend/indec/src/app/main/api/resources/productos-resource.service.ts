import { Injectable } from '@angular/core';
import { IRubros } from '../models/i-rubros';
import { ICategorias } from '../models/i-categorias';
import { IProductosInfo } from '../models/i-productos-info';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IMarcas } from '../models/i-marcas';
import { ITiposProductos } from '../models/i-tipos-productos';
import { StorageResourceService } from './storage-resource.service';

@Injectable({
  providedIn: 'root',
})
export class ProductosResourceService {
  private apiUrl = `${environment.apiUrl}/indec`;

  constructor(private _http: HttpClient, private storageService: StorageResourceService) {}

  private getAuthHeaders(): HttpHeaders {
    // Credenciales de usuario
    const username = 'usr_admin';
    const password = 'pwd_admin';

    // Codificación en Base64 para el encabezado Authorization
    const auth = 'Basic ' + btoa(`${username}:${password}`);

    // Retorna encabezados con autorización básica
    return new HttpHeaders({
      Authorization: auth,
    });
  }

  private getCodIdioma(): number {
    return this.storageService.getCodIdioma();
  }

  getRubros(): Observable<IRubros[]> {
    return this._http
      .get<IRubros[]>(`${this.apiUrl}/rubros/${this.getCodIdioma()}`, {
        headers: this.getAuthHeaders(),
        withCredentials: true,
      })
      .pipe(tap((data) => console.log('Rubros obtenidas:', data)));
  }

  getCategorias(nroRubro: number): Observable<ICategorias[]> {
    return this._http
      .get<ICategorias[]>(`${this.apiUrl}/categorias/${nroRubro}/${this.getCodIdioma()}`, {
        headers: this.getAuthHeaders(),
        withCredentials: true,
      })
      .pipe(tap((data1) => console.log('Categorias obtenidas:', data1)));
  }

  getProductos(): Observable<IProductosInfo[]> {
    return this._http.get<IProductosInfo[]>(`${this.apiUrl}/productos`, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }

  getMarcas(): Observable<IMarcas[]> {
    return this._http.get<IMarcas[]>(`${this.apiUrl}/marcas`, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }

  getTiposProductos(): Observable<ITiposProductos[]> {
    return this._http.get<ITiposProductos[]>(`${this.apiUrl}/tiposProductos/${this.getCodIdioma()}`, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }
}
