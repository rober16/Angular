import { Component } from '@angular/core';
import { ProySimpleComponent } from '../../components/proy-simple/proy-simple.component';
import { ProyMultipleComponent } from '../../components/proy-multiple/proy-multiple.component';
import { ProyCondicionalComponent } from '../../components/proy-condicional/proy-condicional.component';
import { EtiquetaNgContainerComponent } from '../../components/etiqueta-ng-container/etiqueta-ng-container.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    EtiquetaNgContainerComponent,
    ProyCondicionalComponent,
    ProyMultipleComponent,
    ProySimpleComponent
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

}
