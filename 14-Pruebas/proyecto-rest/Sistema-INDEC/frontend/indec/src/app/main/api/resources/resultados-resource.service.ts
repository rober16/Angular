import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResultados } from '../models/i-resultados';

@Injectable({
  providedIn: 'root'
})
export class ResultadosResourceService {

  private apiUrl = `${environment.apiUrl}/indec/comparar`;
  
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

  getResultados(nroLocalidad: number, codBarras: string): Observable<IResultados[]> {
    const headers = this.getAuthHeaders();
    return this._http.get<IResultados[]>(`${this.apiUrl}/${nroLocalidad}/${codBarras}`, { 
        headers: this.getAuthHeaders(),
        withCredentials: true
     });
  }  
}
