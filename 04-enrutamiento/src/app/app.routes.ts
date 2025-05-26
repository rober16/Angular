import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { Page4Component } from './pages/page4/page4.component';

export const routes: Routes = [
  {
    path: 'main', component: MainComponent, children: [
      { path: 'pagina-1', component: Page1Component },
      { path: 'ruta/pagina-2', component: Page2Component },
      { path: 'ruta/pagina-3', loadComponent: () => 
        import('./pages/page3/page3.component').then((c) => c.Page3Component) },
      { path: 'pagina-4', component: Page4Component },
      { path: 'ruta', redirectTo: 'ruta/pagina-2' },
      { path: '**', redirectTo: 'pagina-1' }
    ]
  },
  { path: '**', redirectTo: 'main' }
];

