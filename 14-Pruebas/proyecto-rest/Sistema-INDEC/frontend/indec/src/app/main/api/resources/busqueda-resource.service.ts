import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IProductosInfo } from '../models/i-productos-info';

@Injectable({
  providedIn: 'root'
})
export class BusquedaResourceService {


  private apiUrl = `${environment.apiUrl}/indec`;

  constructor(private _http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
        // Credenciales de usuario
        const username = 'usr_admin';
        const password = 'pwd_admin';
    
        // Codificación en Base64 para el encabezado Authorization
        const auth = 'Basic ' + btoa(`${username}:${password}`);
    
        // Retorna encabezados con autorización básica
        return new HttpHeaders({
          'Authorization': auth
        });
  }

  search(
    filtro: string | null = null,
    filtroCategorias: string | null = null,
    filtroMarca: string | null = null,
    filtroTipo: string | null = null
  ): Observable<IProductosInfo[]> {

    let params = new HttpParams();

    if (filtro) {
      params = params.set('filtro', filtro);
    }
    if (filtroCategorias) {
      params = params.set('filtro_categorias', filtroCategorias);
    }
    if (filtroMarca) {
      params = params.set('filtro_marca', filtroMarca);
    }
    if (filtroTipo) {
      params = params.set('filtro_tipo', filtroTipo);
    }

    return this._http.get<IProductosInfo[]>(`${this.apiUrl}/buscar`, {
      params: params,
      headers: this.getAuthHeaders(),
      withCredentials: true
    }).pipe(
      tap((data) => console.log('Productos encontrados:', data))
    );
  }
  
}
