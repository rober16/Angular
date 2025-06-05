import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css'],
  animations: [
    trigger('growAnimation', [
      state('start', style({ transform: 'scale(1)', transformOrigin: 'center center' })),
      state('end', style({ transform: 'scale(2)', transformOrigin: 'center center' })),
      transition('start => end', animate('5s ease-in-out')) // Asegura el tiempo correcto
    ])
  ]
})
export class SplashScreenComponent implements OnInit {
  animationState = 'start'; // Estado inicial

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Permitir que Angular detecte cambios y haga la animación
    setTimeout(() => {
      this.animationState = 'end';
    }, 50); // Pequeño delay para que Angular lo detecte

    // Redirigir después de 5 segundos
    setTimeout(() => {
      this.router.navigate(['/inicio']);
    }, 5000);
  }

  skipIntro(): void {
    this.router.navigate(['/inicio']);
  }
}
