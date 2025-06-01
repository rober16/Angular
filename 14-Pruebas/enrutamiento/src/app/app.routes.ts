import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { AboutComponent } from './componentes/about/about.component';
import { PageComponent } from './componentes/page/page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'page', component: PageComponent}
];
