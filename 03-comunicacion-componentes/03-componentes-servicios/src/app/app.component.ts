import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from "./components/main/main.component";
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ColorsService } from './services/colors.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule,
    MainComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  private _suscription!: Subscription;
  color!: string;

  constructor(private _service: ColorsService) { }

  ngOnInit(): void {
    this.color = this._service.getCurrentColor();
    this._suscription = this._service.color$.subscribe((color: string) => {
      this.color = color;
    });    
  }

  ngOnDestroy(): void {
    this._suscription.unsubscribe();
  }

}
