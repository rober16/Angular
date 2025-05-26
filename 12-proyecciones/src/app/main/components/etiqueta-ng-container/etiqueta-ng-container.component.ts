import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-etiqueta-ng-container',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './etiqueta-ng-container.component.html',
  styleUrl: './etiqueta-ng-container.component.css'
})
export class EtiquetaNgContainerComponent {

  items: string[] = ["A", "B", "C", "D", "E", "F"];

}
