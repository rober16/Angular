import { Component, DoCheck, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hijo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hijo.component.html',
  styleUrl: './hijo.component.css'
})
export class HijoComponent implements OnChanges, DoCheck, OnDestroy{
  
  @Input() nombre: string = '';
  private previousNombre = '';
  
  constructor() {
    //console.log('🛠️ constructor: componente hijo creado');
  }

  ngOnInit(): void {
    this.previousNombre = this.nombre;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    //console.log('Cambios detectados en @Input():', changes);

    if (changes['nombre']) {
      const cambio = changes['nombre'];
      //console.log('Anterior:', cambio.previousValue);
      //console.log('Nuevo:', cambio.currentValue);
      //console.log('¿Primera vez?:', cambio.firstChange);
    }
  }

  ngDoCheck(): void {
    if (this.nombre !== this.previousNombre) {
      //console.log(`🔍 ngDoCheck: el nombre cambió de '${this.previousNombre}' a '${this.nombre}'`);
      this.previousNombre = this.nombre;
    }
  }

  ngOnDestroy(): void {
    //console.log('❌ ngOnDestroy: componente destruido');
  }
}
