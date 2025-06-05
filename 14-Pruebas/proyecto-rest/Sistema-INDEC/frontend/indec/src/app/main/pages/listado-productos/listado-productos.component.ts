import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IRubros } from '../../api/models/i-rubros';
import { ICategorias } from '../../api/models/i-categorias';
import { IProductosInfo } from '../../api/models/i-productos-info';
import { ProductosResourceService } from '../../api/resources/productos-resource.service';
import { CarritoResourceService } from '../../api/resources/carrito-resource.service';
import { debounceTime, distinctUntilChanged, filter, forkJoin, map, Observable, Subject, Subscription, switchMap, tap } from 'rxjs';
import { BusquedaResourceService } from '../../api/resources/busqueda-resource.service';
import { IMarcas } from '../../api/models/i-marcas';
import { ITiposProductos } from '../../api/models/i-tipos-productos';
import { StorageResourceService } from '../../api/resources/storage-resource.service';

@Component({
  selector: 'app-listado-productos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.css'
})
export class ListadoProductosComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  rubros!: IRubros[];
  categorias!: ICategorias[];
  categoriasFiltradas: ICategorias[] = [];
  productos!: IProductosInfo[];
  marcas!: IMarcas[];
  tiposProductos!: ITiposProductos[];

  tituloBoton: string = 'Agregar al carrito';
  productosEnCarrito: { [codBarra: string]: boolean } = {};
  contadorCarrito: { [codBarra: string]: number } = {}; // Objeto con codBarra como clave
  searchTerm = '';
  results: IProductosInfo[] = [];
  filtro_Inicio: string | null = '';

  private searchSubject = new Subject<string>();
  private searchSubscription: Subscription;

  mostrarFiltros: boolean = false;
  rubrosSeleccionados: number[] = [];
  categoriasSeleccionadas: number[] = [];
  marcasSeleccionadas: number[] = [];
  tiposProductosSeleccionados: number[] = [];

  productosFiltrados: IProductosInfo[] = []; // Solo los filtrados desde backend
  private carritoSubscription: Subscription | undefined;
  private storageSubscription: Subscription | undefined;
  
  constructor(
    private _fb: FormBuilder, 
    private _service: ProductosResourceService, 
    private carritoService: CarritoResourceService,
    private cdRef: ChangeDetectorRef,
    private busquedaService: BusquedaResourceService,
    private storageService: StorageResourceService
  ) {
      this.searchSubscription = this.searchSubject.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(term => term.length >= 3),
        switchMap(term => this.busquedaService.search(term))
      ).subscribe(data => {
        this.productosFiltrados = data; // Mostrar directamente acá
      });
   }

  
  ngOnInit(): void {      
    // Inicializar el formulario
    this.initForm();
    const puerto = window.location.port;
    
    let codIdioma = 1;        
    if(puerto == "4201"){
      codIdioma = 2
    }
    this.storageService.setCodIdioma(codIdioma);

    this._service.getRubros().subscribe(rubros => {
      this.rubros = rubros;
    });
    
    this._service.getProductos().subscribe(productos => {
      this.productos = productos;
      this.productosFiltrados = productos;

      // Mueve la suscripción a obtenerCarrito() aquí dentro
      this.carritoSubscription = this.carritoService.obtenerCarrito().subscribe(() => {
        this.actualizarEstadoBotones();
      });
    }); 

    this._service.getMarcas().subscribe(marcas => {
      this.marcas = marcas;
    });

    this._service.getTiposProductos().subscribe(tipos => {
      this.tiposProductos = tipos;
    });

    // Mueve la suscripción a obtenerCarrito() aquí dentro
    this.storageSubscription = this.storageService.obtenerFiltro().subscribe(filtro => {
      this.busquedaService.search(filtro, null, null, null).subscribe(resultados => {        
        this.productosFiltrados = resultados;
        this.searchTerm = filtro?.valueOf() ?? '';
      });
    });
  }
  
  private initForm(): void {
    this.form = this._fb.group({
      nroRubro: [null],
      nroCategoria: [null]
    });
    this.form.updateValueAndValidity();
  }

  cargarCategorias(nroRubro: number): Observable<ICategorias[]> {
      return this._service.getCategorias(nroRubro).pipe(
        tap(categorias => {
          this.categorias = categorias;
          this.categoriasFiltradas = categorias;
        })
      );
    }

  agregarAlCarrito(producto: IProductosInfo): void {
    const codBarra = producto.codBarra;
    if (!this.productosEnCarrito[codBarra]) { // Verificar si ya está en el carrito
      this.carritoService.agregarProducto(producto);
      this.productosEnCarrito[codBarra] = true; // Marcar como agregado
      this.contadorCarrito[codBarra] = (this.contadorCarrito[codBarra] || 0) + 1; // Actualizar contador
      this.cdRef.detectChanges(); 
    }
  }
  // Método para obtener el título del botón según el estado del producto
  obtenerTituloBoton(producto: IProductosInfo): string {
    return this.productosEnCarrito[producto.codBarra] ? $localize `Producto agregado` : $localize `Agregar al carrito`;
  }

  obtenerTituloBotonFiltro(mostrarFiltros: boolean): string{
    return mostrarFiltros ? $localize `Ocultar Filtros` : $localize `Agregar Filtros`
  }

  // Método para obtener la clase CSS del botón
  obtenerClaseBoton(producto: IProductosInfo): string {
    return this.productosEnCarrito[producto.codBarra] ? 'boton-agregado' : '';
  }
  // Método para verificar si se debe deshabilitar el botón
  estaDeshabilitado(codBarra: string): boolean {
    return this.contadorCarrito[codBarra] >= 1;
  }

  onSearchChange(): void {
    const term = this.searchTerm.trim();
    if (term.length < 3) {
      // Volver a mostrar todos si se borra la búsqueda
      this.productosFiltrados = this.productos;
    } else {
      this.searchSubject.next(term);
    }
  }

  private actualizarEstadoBotones(): void {
    // Ahora this.productos siempre estará definido aquí
    this.productos.forEach(producto => {
        this.productosEnCarrito[producto.codBarra] = this.carritoService.existeProducto(producto.codBarra); 
        this.contadorCarrito[producto.codBarra] = this.productosEnCarrito[producto.codBarra] ? 1 : 0;
    });
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.carritoSubscription) { // Verificar si existe antes de desuscribirse
      this.carritoSubscription.unsubscribe();
    }
    this.searchSubscription.unsubscribe();
  }

  //Sección de rubros y categorias en base al boton aplicar filtros
  toggleFiltros() {
    this.mostrarFiltros = !this.mostrarFiltros;
    this.searchTerm = '';
    this.storageService.guardarFiltro('');
  }

  // Para cargar categorías de todos los rubros seleccionados
  cargarCategoriasMultiples(): void {
    this.categoriasFiltradas = []; // Limpiar antes
    const observables = this.rubrosSeleccionados.map(rubroId =>
      this._service.getCategorias(rubroId)
    );
    // Combinar todas las respuestas en una sola
    forkJoin(observables).subscribe((resultados) => {
      this.categoriasFiltradas = resultados.flat();
    });
  }

  onRubroChange(nroRubro: number, checked: boolean) {
    if (checked) {
      this.rubrosSeleccionados.push(nroRubro);
    } else {
      this.rubrosSeleccionados = this.rubrosSeleccionados.filter(id => id !== nroRubro);
    }
  
    // Resetear selección de categorías al cambiar rubros
    this.categoriasSeleccionadas = [];
    this.categoriasFiltradas = [];
  
    const rubrosObservables = this.rubrosSeleccionados.map(rubroId =>
      this._service.getCategorias(rubroId)
    );
  
    if (rubrosObservables.length > 0) {
      forkJoin(rubrosObservables).subscribe(respuestas => {
        this.categoriasFiltradas = respuestas.flat();
      });
    }
  }
  
  onCategoriaChange(nroCategoria: number, checked: boolean) {
    if (checked) {
      this.categoriasSeleccionadas.push(nroCategoria);
    } else {
      this.categoriasSeleccionadas = this.categoriasSeleccionadas.filter(id => id !== nroCategoria);
    }
  }

  onMarcaChange(nroMarca: number, checked: boolean) {
    if (checked) {
      this.marcasSeleccionadas.push(nroMarca);
    } else {
      this.marcasSeleccionadas = this.marcasSeleccionadas.filter(id => id !== nroMarca);
    }  
  }

  onTiposProductosChange(nroTipoProducto: number, checked: boolean) {
    if (checked) {
      this.tiposProductosSeleccionados.push(nroTipoProducto);
    } else {
      this.tiposProductosSeleccionados = this.tiposProductosSeleccionados.filter(id => id !== nroTipoProducto);
    }
  
  }
  
  aplicarFiltros() {
    // Aplica los filtros al listado de productos
    const filtro = this.searchTerm.trim();
    const categorias = this.categoriasSeleccionadas.length > 0 ? this.categoriasSeleccionadas.join(",") : null;
    const marcas = this.marcasSeleccionadas.length > 0 ? this.marcasSeleccionadas.join(",") : null;
    const tipos = this.tiposProductosSeleccionados.length > 0 ? this.tiposProductosSeleccionados.join(",") : null;
    
    this.busquedaService.search(filtro, categorias, marcas, tipos).subscribe(resultados => {
      this.productosFiltrados = resultados;
    });
  }

  limpiarFiltros(){
    this.mostrarFiltros = false;
    this.searchTerm = '';
    this.storageService.guardarFiltro('');
    this.rubrosSeleccionados = [];
    this.categoriasSeleccionadas = [];
    this.marcasSeleccionadas = [];
    this.tiposProductosSeleccionados = [];
  }

  onRubroCheckboxChange(event: Event, nroRubro: number): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.onRubroChange(nroRubro, checked);
  }
  
  onCategoriaCheckboxChange(event: Event, nroCategoria: number): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.onCategoriaChange(nroCategoria, checked);
  }

  onMarcaCheckboxChange(event: Event, nroMarca: number) {
    const checked = (event.target as HTMLInputElement).checked;
    this.onMarcaChange(nroMarca, checked);
  }

  onTiposProductosCheckboxChange(event: Event, nroTipoProducto: number) {
    const checked = (event.target as HTMLInputElement).checked;
    this.onTiposProductosChange(nroTipoProducto, checked);
  }
  
}