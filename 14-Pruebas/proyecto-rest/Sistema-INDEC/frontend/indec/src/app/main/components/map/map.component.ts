import { Component, AfterViewInit, ElementRef, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { ISucursalInfo } from '../../api/models/i-sucursal-info';

@Component({
  selector: 'app-map',
  standalone: true,
  template: `<div col-md-6 #mapContainer style="height: 500px; width: 100%;"></div>`,
  styles: [`
    :host {
      display: block;
    }
    button {
      margin-top: 10px;
    }
  `]
})
export class MapComponent implements AfterViewInit, OnChanges {

  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  
  @Input() sucursales: ISucursalInfo[] = [];
  @Input() selectedSucursal: ISucursalInfo | null = null;

  map!: L.Map;
  markers: L.Marker[] = [];

  ngAfterViewInit(): void {
    this.inicializarMapa();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.actualizarMarcadores();
    /*if (changes['sucursales'] && this.map) {
      this.actualizarMarcadores();
    }*/

    if (this.sucursales.length > 0 && this.sucursales[0].coordLatitud && this.sucursales[0].coordLongitud) {
      this.map.setView([Number(this.sucursales[0].coordLatitud), Number(this.sucursales[0].coordLongitud)], 30);
    }

    if (changes['selectedSucursal'] && this.selectedSucursal && this.selectedSucursal.coordLatitud && this.selectedSucursal.coordLongitud) {
      const lat = Number(this.selectedSucursal.coordLatitud);
      const lng = Number(this.selectedSucursal.coordLongitud);
      this.map.setView([lat, lng], 30);
    }
  }

  private inicializarMapa(): void {
    this.map = L.map(this.mapContainer.nativeElement).setView([0, 0], 30);
    this.map.locate({ setView: true, maxZoom: 16 });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }
  
  // Se encarga de agregar todos los marcadores basados en las sucursales recibidas
  private actualizarMarcadores(): void {
    // Primero, elimina los marcadores existentes (si los hubiese)
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.markers = [];
    
    // Recorrer cada sucursal y agregar un marcador
    this.sucursales.forEach(sucursal => {
      if(sucursal.coordLatitud && sucursal.coordLongitud) {
        const marker = L.marker([Number(sucursal.coordLatitud), Number(sucursal.coordLongitud)]).addTo(this.map);
        marker.bindPopup(`
          <h5>${sucursal.nomSucursal}</h5>
          <p>Dirección: ${sucursal.calle} ${sucursal.nroCalle}</p>
          <p>Teléfono: ${sucursal.telefonos}</p>
          <p>Horarios de atención: ${ sucursal.horarioSucursal }</p>
          <p>Servicios disponibles: ${ sucursal.serviciosDisponibles }</p>
        `);
        this.markers.push(marker);
      }
    });
  }
}
