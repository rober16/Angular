import { Routes } from '@angular/router';
import { ListadoComponent } from './main/pages/listado/listado.component';
import { personasResolver } from './main/resolvers/personas.resolver';
import { PersonasResourceService } from './main/api/resources/personas-resource.service';
import { generosResolver } from './main/resolvers/generos.resolver';
import { nacionalidadesResolver } from './main/resolvers/nacionalidades.resolver';
import { equiposResolver } from './main/resolvers/equipos.resolver';
import { actividadesResolver } from './main/resolvers/actividades.resolver';
import { FormularioComponent } from './main/pages/formulario/formulario.component';
import { infoResolver } from './main/resolvers/info.resolver';

export const routes: Routes = [
  {path: 'main', component: ListadoComponent, resolve: {listado: personasResolver}, providers: [PersonasResourceService] },
  {path: 'main/nuevo', component: FormularioComponent, resolve: {
    generos: generosResolver, 
    nacionalidades: nacionalidadesResolver,
    equipos: equiposResolver,
    actividades: actividadesResolver
  }, providers: [PersonasResourceService] },
  {path: 'main/editar/:id', component: FormularioComponent, resolve: {
    generos: generosResolver, 
    nacionalidades: nacionalidadesResolver,
    equipos: equiposResolver,
    actividades: actividadesResolver,
    info: infoResolver
  }, providers: [PersonasResourceService] },
  {path: '**', redirectTo: 'main'}
];
