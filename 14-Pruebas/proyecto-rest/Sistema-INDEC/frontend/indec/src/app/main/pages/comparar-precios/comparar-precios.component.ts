import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IRubros } from '../../api/models/i-rubros';
import { ICategorias } from '../../api/models/i-categorias';
import { IProductosInfo } from '../../api/models/i-productos-info';
import { ProductosResourceService } from '../../api/resources/productos-resource.service';
import { catchError, filter, map, Observable, switchMap, tap, throwError} from 'rxjs';
import { CarritoResourceService } from '../../api/resources/carrito-resource.service';
import { IProvincia } from '../../api/models/i-provincia';
import { ILocalidad } from '../../api/models/i-localidad';
import { SucursalesResourceService } from '../../api/resources/sucursales-resource.service';
import { IResultados } from '../../api/models/i-resultados';
import { ResultadosResourceService } from '../../api/resources/resultados-resource.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageResourceService } from '../../api/resources/storage-resource.service';

@Component({
  selector: 'app-comparar-precios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './comparar-precios.component.html',
  styleUrls: ['./comparar-precios.component.css'],
})
export class CompararPreciosComponent {
  form!: FormGroup;
  productosCarrito: IProductosInfo[] = [];
  ubicacion: ILocalidad | null = null;

  provincias!: IProvincia[];
  localidadesFiltradas: ILocalidad[] = [];
  localidades!: ILocalidad[];
  resultados!: IResultados[];

  productosImg: IResultados[] = [];
  supermercados: string[] = [];
  tablaPrecios: { [key: string]: { [key: string]: number } } = {};
  totales: { [key: string]: number } = {};
  mejorPrecioPorProducto: { [key: string]: string } = {};

  
  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _carritoService: CarritoResourceService,
    private _sucursalesservice: SucursalesResourceService,
    private _resultadosService: ResultadosResourceService,
    private _storageService: StorageResourceService
  ) {}

  ngOnInit(): void {
    // Obtener las provincias desde el resolver
    this.provincias = this._route.snapshot.data['provincias'];

    // Inicializar el formulario
    this.initForm();

    this._storageService.obtenerUbicacion().subscribe((ubicacion) => {
      this.ubicacion = ubicacion;
    });

    this.obtenerResultados();
    
    this.form.get('codProvincia')?.valueChanges.pipe(
        tap((codProvincia) => {
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

          const provinciaSeleccionada = this.provincias.find(
            (p) => p.codProvincia === codProvincia
          );
          const localidadSeleccionada = this.localidades.find(
            (l) => l.nroLocalidad === Number(nroLocalidad)
          );

          const ubicaciones: ILocalidad = {
            nroLocalidad: nroLocalidad,
            nomLocalidad: localidadSeleccionada
              ? localidadSeleccionada.nomLocalidad
              : '',
            codProvincia: codProvincia,
            nomProvincia: provinciaSeleccionada
              ? provinciaSeleccionada.nomProvincia
              : '',
          };
          this._storageService.guardarUbicacion(ubicaciones);
          this.obtenerResultados();
        }
    });
  }

  private initForm(): void {
    this.form = this._fb.group({
      codProvincia: [{ value: '', disabled: true }],
      codLocalidad: [{ value: '', disabled: true }]
    });
    this.form.updateValueAndValidity();
  }

  cambiarUbicacion(){
    this.form.get('codProvincia')?.enable();
    this.form.get('codLocalidad')?.enable();
  }

  eliminarDelCarrito(producto: IProductosInfo): void {
    this._carritoService.eliminarProducto(producto); // Usar el método del servicio
  }

  obtenerResultados(): void {
    const codLocalidad = this.ubicacion?.nroLocalidad;
    const codBarras = this._carritoService.obtenerCodigosConcatenados();

      if (codLocalidad && codBarras) {
        this._resultadosService
          .getResultados(codLocalidad, codBarras)
          .subscribe({
            next: (resultados) => {
              this.resultados = resultados;
              // Procesar resultados para construir la tabla
              console.log('==== RESULTADOS ====');
              console.log(resultados);
              this.procesarResultados(resultados);
            },
            error: (error: any) => {
              console.error('Error al obtener los resultados:', error);
              if (error instanceof HttpErrorResponse) {
                console.error(
                  `Código de estado: ${error.status}, Mensaje: ${error.message}`
                );
                if (error.status === 404) {
                  console.error(
                    'No se encontraron resultados para la búsqueda.'
                  );
                } else if (error.status === 500) {
                  console.error(
                    'Error interno del servidor. Inténtalo más tarde.'
                  );
                } else {
                  console.error('Ocurrió un error al obtener los resultados.');
                }
              } else {
                console.error('Ocurrió un error inesperado.');
              }
            },
            complete: () => {
              console.log(
                'La solicitud para obtener resultados ha finalizado.'
              );
            },
          });
    }
  }

  private procesarResultados(resultados: IResultados[]): void {
    // Resetear las propiedades para evitar se acumulen los datos
    this.productosImg = []; // Limpia el array al inicio
    this.supermercados = [];
    this.tablaPrecios = {};
    this.totales = {};
    this.mejorPrecioPorProducto = {};

    resultados.forEach(resultado => {
      const { nomProducto, imagen, nomSupermercado, precio, totalXSupermercado } = resultado;

      if (!this.productosImg.some(p => p.nomProducto === nomProducto)) {
        this.productosImg.push(resultado);
      }

      if (!this.supermercados.includes(nomSupermercado)) {
        this.supermercados.push(nomSupermercado);
      }

      // Usa nomProducto (string) como clave
      if (!this.tablaPrecios[nomProducto]) { 
        this.tablaPrecios[nomProducto] = {};
      }
      this.tablaPrecios[nomProducto][nomSupermercado] = precio;


       // Calcula los totales directamente aquí
      this.totales[nomSupermercado] = (this.totales[nomSupermercado] || 0) + precio;


    });
    
    for (const nomProducto in this.tablaPrecios) {
      let mejorPrecio = Infinity;
      let supermercadoGanador = '';
      for (const supermercado in this.tablaPrecios[nomProducto]) {
        const precio = this.tablaPrecios[nomProducto][supermercado];
        if (precio < mejorPrecio) {
          mejorPrecio = precio;
          supermercadoGanador = supermercado;
        }
      }
      this.mejorPrecioPorProducto[nomProducto] = supermercadoGanador;
    }

    // Determinar el supermercado ganador general
    const conteoGanadores: { [key: string]: number } = {};
    for (const producto in this.mejorPrecioPorProducto) {
      const supermercado = this.mejorPrecioPorProducto[producto];
      conteoGanadores[supermercado] = (conteoGanadores[supermercado] || 0) + 1;
    }

    let supermercadoGanadorGeneral = '';
    let maxGanadas = 0;

    for (const supermercado in conteoGanadores) {
      if (conteoGanadores[supermercado] > maxGanadas) {
        maxGanadas = conteoGanadores[supermercado];
        supermercadoGanadorGeneral = supermercado;
      }
    }
    /*Fin Nuevo codigo*/
  }

  esSupermercadoGanador(supermercado: string): boolean {
    const conteoGanadores: { [key: string]: number } = {};
    for (const producto in this.mejorPrecioPorProducto) {
      const supermercadoGanador = this.mejorPrecioPorProducto[producto];
      conteoGanadores[supermercadoGanador] =
        (conteoGanadores[supermercadoGanador] || 0) + 1;
    }

    let supermercadoGanadorGeneral = '';
    let maxGanadas = 0;
    for (const s in conteoGanadores) {
      if (conteoGanadores[s] > maxGanadas) {
        maxGanadas = conteoGanadores[s];
        supermercadoGanadorGeneral = s;
      }
    }

    return supermercado === supermercadoGanadorGeneral;
  }

  esMejorPrecio(producto: IResultados, supermercado: string): boolean {  // <--- Cambia el tipo de producto
    return this.mejorPrecioPorProducto[producto.nomProducto] === supermercado; // <--- Accede al nombre
  }

  cargarLocalidades(codProvincia: string): Observable<ILocalidad[]> {
    return this._sucursalesservice.getLocalidades(codProvincia).pipe(
      tap((localidades) => {
        this.localidades = localidades;
        this.localidadesFiltradas = localidades;
      })
    );
  }
}
