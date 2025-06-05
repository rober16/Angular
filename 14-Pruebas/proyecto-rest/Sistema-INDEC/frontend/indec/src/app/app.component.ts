import { Component, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./main/components/header/header.component";
import { CoreModule } from "./core/core.module";
import { FooterComponent } from './main/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CoreModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'indec';

  isSplashScreenActive = false; // Variable para controlar si estamos en el Splash Screen

  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Detecta si estamos en el Splash Screen
        this.isSplashScreenActive = (event.url === '/');

        // Manipula directamente el body para estilos globales
        if (this.isSplashScreenActive) {
          this.renderer.addClass(document.body, 'splash-screen-active');
        } else {
          this.renderer.removeClass(document.body, 'splash-screen-active');
        }
      }
    });
  }
}
