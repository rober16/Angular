import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { CarritoResourceService } from '../../api/resources/carrito-resource.service';
import { CommonModule } from '@angular/common';
import { IProductosInfo } from '../../api/models/i-productos-info';
import { Router, RouterModule } from '@angular/router';
import { IProvincia } from '../../api/models/i-provincia';
import { ILocalidad } from '../../api/models/i-localidad';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { SucursalesResourceService } from '../../api/resources/sucursales-resource.service';
import { StorageResourceService } from '../../api/resources/storage-resource.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})

export class HeaderComponent implements OnInit{
  active: boolean = false;
  src!: SafeResourceUrl;
  cantidadProductos: number = 0;
  productosCarrito: IProductosInfo[] = [];
  mostrarCarrito: boolean = false; // Controla la visibilidad del modal
  form!: FormGroup;
  provincias!: IProvincia[];
  localidadesFiltradas: ILocalidad[] = []; // Localidades filtradas
  localidades!: ILocalidad[];
  provinciaSeleccionada: string = '';
  codIdioma: number = 1;

  constructor(
    private carritoService: CarritoResourceService,
    private storageService: StorageResourceService,
    private _fb: FormBuilder,
    private _service: SucursalesResourceService,
    private router: Router,
  ) {}

  toggle(): void {
    this.active = !this.active;
  }

  ngOnInit(): void {
    // Inicializar el formulario
    this.initForm();

    if (window.location.port === "4201") {
      this.codIdioma = 2;
    }

    // Escuchar los cambios en el carrito y actualizar la cantidad de productos
    this.carritoService.obtenerCarrito().subscribe((carrito) => {
      this.productosCarrito = carrito;
      this.actualizarCantidadProductos();
    });

    // Obtener las provincias desde servicio en lugar de resolver
    this._service.getProvincias().subscribe({
      next: (data: IProvincia[]) => {
        this.provincias = data;
        console.log('Provincias recibidas en el componente:', data);
      },
      error: (error) => {
        console.error('Error al obtener provincias:', error);
      },
    });   

    // Escuchar cambios en el select de provincias para cargar localidades
    this.form.get('codProvincia')?.valueChanges.pipe(tap((codProvincia) => {
          // Limpiar el select de localidades y resetear el control
          this.localidadesFiltradas = [];
          this.form.get('codLocalidad')?.setValue(null);
        }),
        filter((codProvincia) => !!codProvincia), // Solo proceder si el valor no es nulo o vacío
        switchMap((codProvincia) => this.cargarLocalidades(codProvincia))
      ).subscribe();

    this.form.get('codLocalidad')?.valueChanges.subscribe((codLocalidad: number) => {
      if (codLocalidad) {
        // Llamar al servicio para guardar la localidad
        const codProvincia = this.form.get('codProvincia')?.value;
        const nroLocalidad = this.form.get('codLocalidad')?.value;

        const provinciaSeleccionada = this.provincias.find((p) => p.codProvincia === codProvincia);
        const localidadSeleccionada = this.localidades.find((l) => l.nroLocalidad === Number(nroLocalidad));

        const ubicaciones: ILocalidad = {
          nroLocalidad: nroLocalidad,
          nomLocalidad: localidadSeleccionada ? localidadSeleccionada.nomLocalidad : '',
          codProvincia: codProvincia,
          nomProvincia: provinciaSeleccionada ? provinciaSeleccionada.nomProvincia : '',
        };
        this.storageService.guardarUbicacion(ubicaciones);
      }
    });
  }

  // Método para abrir/cerrar el modal del carrito
  toggleCarrito(): void {
    this.mostrarCarrito = !this.mostrarCarrito;
    console.log('Estado del modal:', this.mostrarCarrito); // Verificar en consola si cambia el estado
  }

  compararPrecios(): void {
    this.mostrarCarrito = !this.mostrarCarrito;
    console.log('Estado del modal:', this.mostrarCarrito);

    this.router.navigateByUrl('/inicio/comparar-productos').then(() => {
        window.location.reload(); // Forzar la recarga completa si es necesario
    });
  }

  eliminarDelCarrito(producto: IProductosInfo): void {
    this.carritoService.eliminarProducto(producto); // Usar el método del servicio
  }

  private actualizarCantidadProductos(): void {
    this.cantidadProductos = this.productosCarrito.length;
  }

  private initForm(): void {
    this.form = this._fb.group({
      codProvincia: [null],
      codLocalidad: [null],
    });
    this.form.updateValueAndValidity();
  }

  cargarLocalidades(codProvincia: string): Observable<ILocalidad[]> {
    return this._service.getLocalidades(codProvincia).pipe(tap((localidades) => {
        this.localidades = localidades;
        this.localidadesFiltradas = localidades;
      })
    );
  }

  cambiarIdioma(): void {
  const currentPort = window.location.port;

  if (currentPort === '4200') {
    // Español a Inglés
    window.location.href = 'http://localhost:4201/inicio';
  } else if (currentPort === '4201') {
    // Inglés a Español
    window.location.href = 'http://localhost:4200/inicio';
  }
}
}