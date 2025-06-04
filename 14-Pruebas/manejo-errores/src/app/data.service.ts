import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

   obtenerDatos() {
    return this.http.get('https://pokeapi.co/api/v2/pokemon').pipe(
      catchError((error) => {
        console.error('Error al obtener datos:', error);
        return throwError(() => new Error('Error al obtener datos'));
      })
    );
  }
}
