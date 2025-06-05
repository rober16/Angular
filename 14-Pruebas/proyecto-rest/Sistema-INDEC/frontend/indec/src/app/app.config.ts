import { ApplicationConfig, ErrorHandler, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appHttpInterceptor } from './core/interceptors/app-http.interceptor';
import { CoreModule } from './core/core.module';
import { AppErrorHandler } from './core/handlers/app-error-handler';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  

  providers: [
    provideHttpClient(
      withInterceptors([appHttpInterceptor])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    importProvidersFrom(CoreModule),
    { provide: ErrorHandler, useClass: AppErrorHandler },
    provideAnimations()       // Soporte para animaciones
  ]  
};
