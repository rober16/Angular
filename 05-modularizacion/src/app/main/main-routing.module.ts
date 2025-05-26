import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompTradicionalComponent } from './pages/comp-tradicional/comp-tradicional.component';

const routes: Routes = [
  { path: 'comp-trad', component: CompTradicionalComponent },
  { path: 'comp-ind', loadComponent: () => 
    import('./pages/comp-independiente/comp-independiente.component').then(c => c.CompIndependienteComponent) },
  { path: '**', redirectTo: 'comp-trad'}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
