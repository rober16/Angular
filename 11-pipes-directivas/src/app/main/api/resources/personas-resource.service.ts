import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEquipo } from '../models/i-equipo';
import { IGenero } from '../models/i-genero';
import { INacionalidad } from '../models/i-nacionalidad';
import { IActividad } from '../models/i-actividad';
import { IPersona } from '../models/i-persona';
import { IPersonaInfo } from '../models/i-persona-info';

@Injectable()
export class PersonasResourceService {

  private apiUrl = `${environment.apiUrl}/personas`;

  constructor(private _http: HttpClient) {}

  getGeneros(): Observable<IGenero[]> {
    return this._http.get<IGenero[]>(`${this.apiUrl}/generos`);
  }

  getNacionalidades(): Observable<INacionalidad[]> {
    return this._http.get<INacionalidad[]>(`${this.apiUrl}/nacionalidades`);
  }

  getEquipos(): Observable<IEquipo[]> {
    return this._http.get<IEquipo[]>(`${this.apiUrl}/equipos`);
  }

  getActivdades(): Observable<IActividad[]> {
    return this._http.get<IActividad[]>(`${this.apiUrl}/actividades`);
  }

  getPersonas(): Observable<IPersona[]> {
    return this._http.get<IPersona[]>(`${this.apiUrl}/listado`);
  }

  getDatosPersona(id: String): Observable<IPersonaInfo> {
    return this._http.get<IPersonaInfo>(`${this.apiUrl}/persona/${id}`);
  }

  actPersona(info: IPersonaInfo): Observable<void> {
    return this._http.post<void>(`${this.apiUrl}/persona`, info);
  }

  delPersona(id: String): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/persona/${id}`);
  }

}
