import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { IProvincia } from '../models/i-provincia';
import { ILocalidad } from '../models/i-localidad';
import { ISucursalInfo } from '../models/i-sucursal-info';


@Injectable({
  providedIn: 'root'
})

export class SucursalesResourceService {

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
  
  getProvincias(): Observable<IProvincia[]> {
    return this._http.get<IProvincia[]>(`${this.apiUrl}/provincias`, {
      headers: this.getAuthHeaders(),
      withCredentials: true
    }).pipe(
      tap((dataProvincias) => console.log('Provincias obtenidas:', dataProvincias))
    );
  }

  getLocalidades(codProvincia: String): Observable<ILocalidad[]> {
    return this._http.get<ILocalidad[]>(`${this.apiUrl}/localidades/${codProvincia}`, {
      headers: this.getAuthHeaders(),
      withCredentials: true
    })
    .pipe(
      tap((datalocalidades) => console.log('Localidades obtenidas:', datalocalidades))
    );;
  }

  getSucursales(nroLocalidad: number): Observable<ISucursalInfo[]> {
    return this._http.get<ISucursalInfo[]>(`${this.apiUrl}/sucursales/${nroLocalidad}`, {
      headers: this.getAuthHeaders(),
      withCredentials: true
    })
    .pipe(
      tap((dataSucursales) => console.log('Sucursales obtenidas:', dataSucursales))
    );;
  }
  

  
}
