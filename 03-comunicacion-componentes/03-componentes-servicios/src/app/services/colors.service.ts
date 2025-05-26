import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  private _color: string = 'bg-white';
  private _colorSub = new Subject<string>();

  get color$(): Observable<string> {
    return this._colorSub.asObservable();
  }

  changeColor(color: string): void {
    this._color = color;
    this._colorSub.next(color);
  }

  getCurrentColor(): string {
    return this._color;
  }

}
