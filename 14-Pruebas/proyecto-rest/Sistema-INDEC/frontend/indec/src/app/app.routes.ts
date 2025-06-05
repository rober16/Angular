import { Routes } from '@angular/router';
import { SucursalesComponent } from './main/pages/sucursales/sucursales.component';
import { provinciaResolver } from './main/resolvers/provincia.resolver';
import { SucursalesResourceService } from './main/api/resources/sucursales-resource.service';
import { HomeComponent } from './main/components/home/home.component';
import { CompararPreciosComponent } from './main/pages/comparar-precios/comparar-precios.component';
import { rubroResolver } from './main/resolvers/rubro.resolver';
import { ProductosResourceService } from './main/api/resources/productos-resource.service';
import { ListadoProductosComponent } from './main/pages/listado-productos/listado-productos.component';
import { SplashScreenComponent } from './main/pages/splash-screen/splash-screen.component';

export const routes: Routes = [

    
  { path: '', component: SplashScreenComponent }, // Página inicial con el splash  
    { path: 'inicio', component: HomeComponent },
    { path: 'inicio/sucursales', component: SucursalesComponent, resolve: {
        provincias: provinciaResolver
        
      }, providers: [SucursalesResourceService] },
    { path: 'inicio/productos', component:ListadoProductosComponent, resolve: {
        rubros: rubroResolver
        
      }, providers: [ProductosResourceService] },
    { path: 'inicio/comparar-productos', component:CompararPreciosComponent, resolve: {
        provincias: provinciaResolver
        
      }, providers: [ProductosResourceService, SucursalesResourceService] },
    { path: '**', redirectTo: 'inicio' }

];
