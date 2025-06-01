import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ComunicacionService {
  constructor() { }
  private valorSubject = new BehaviorSubject<number>(0);
  valor$ = this.valorSubject.asObservable();

  enviarValor(nuevoValor: number) {
    this.valorSubject.next(nuevoValor);
  }
}
