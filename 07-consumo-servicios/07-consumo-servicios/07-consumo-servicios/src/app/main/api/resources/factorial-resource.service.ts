import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FactorialResourceService {
  
  private apiUrl = `${environment.apiUrl}/factorial`;

  constructor(private _http: HttpClient) {}

  getFactorial(nro: number): Observable<number[]> {
    return this._http.get<number[]>(`${this.apiUrl}/${nro}`);
  }
  
}
