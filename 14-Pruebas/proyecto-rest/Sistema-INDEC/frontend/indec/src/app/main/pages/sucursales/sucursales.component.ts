import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute,Router, RouterModule } from '@angular/router';
import { IProvincia } from '../../api/models/i-provincia';
import { ILocalidad } from '../../api/models/i-localidad';
import { SucursalesResourceService } from '../../api/resources/sucursales-resource.service';
import { ISucursalInfo } from '../../api/models/i-sucursal-info';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-sucursales',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MapComponent
  ],
  templateUrl: './sucursales.component.html',
  styleUrl: './sucursales.component.css'
})

export class SucursalesComponent {

  form!: FormGroup;
  provincias!: IProvincia[];
  localidadesFiltradas: ILocalidad[] = []; // Localidades filtradas
  localidades!: ILocalidad[];
  sucursales: ISucursalInfo[] = [];
  selectedSucursal: ISucursalInfo | null = null;
  mostrarMapa = false;
  constructor(private _fb: FormBuilder, private _route: ActivatedRoute, private _service: SucursalesResourceService, private _router: Router) { }

  ngOnInit(): void {
      // Inicializar el formulario
      this.initForm();

      // Obtener las provincias desde el resolver
      this.provincias = this._route.snapshot.data['provincias'];    
  
      // Escuchar los cambios en la selección de provincia
      this.form.get('codProvincia')?.valueChanges.pipe(
          tap(() => { // Limpiar localidades y sucursales inmediatamente
            this.localidadesFiltradas = [];
            this.form.get('codLocalidad')?.setValue(null); 
            this.sucursales = []; 
          }),
          filter((codProvincia) => !!codProvincia), // Filtrar valores nulos o vacíos
          switchMap((codProvincia) => this.cargarLocalidades(codProvincia).pipe(map(() => codProvincia))) // Usar switchMap para encadenar las llamadas
        ).subscribe(codProvincia => {
      });

      // Cargar sucursales al cambiar la selección de localidad
      this.form.get('codLocalidad')?.valueChanges.subscribe((codLocalidad) => {
        if (codLocalidad) {
          this.cargarSucursales(codLocalidad);
          this.mostrarMapa = true; // Mostrar el mapa cuando se selecciona una localidad
        } else {
          this.sucursales = [];
          this.mostrarMapa = false; // Ocultar el mapa si no hay localidad seleccionada
        }
      });
  }
  
  private initForm(): void {
    this.form = this._fb.group({
      codProvincia: [0],
      codLocalidad: [0]
    });
    this.form.updateValueAndValidity();
  }

  cargarLocalidades(codProvincia: string): Observable<ILocalidad[]> {
    return this._service.getLocalidades(codProvincia).pipe(
      tap(localidades => {
        this.localidades = localidades;
        this.localidadesFiltradas = localidades;
      })
    );
  }

  cargarSucursales(nroLocalidad: number): void {
    this._service.getSucursales(nroLocalidad).subscribe((sucursales) => {
      this.sucursales = sucursales;
      this.mostrarMapa = this.sucursales.length > 0;
    });
  }

  seleccionarSucursal(sucursal: ISucursalInfo): void {
    this.selectedSucursal = sucursal;
  }
 
}
