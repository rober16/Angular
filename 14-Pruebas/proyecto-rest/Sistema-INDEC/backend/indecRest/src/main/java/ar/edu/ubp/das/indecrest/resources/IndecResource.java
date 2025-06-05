package ar.edu.ubp.das.indecrest.resources;
import ar.edu.ubp.das.indecrest.beans.*;
import ar.edu.ubp.das.indecrest.repositories.IndecRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/indec")
public class IndecResource {

    @Autowired
    private IndecRepository indecRepository;

    @GetMapping("/provincias")
    public ResponseEntity<List<ProvinciaBean>> obtenerProvincias() {
        List<ProvinciaBean> provincias = indecRepository.getProvincias();
        return ResponseEntity.ok(provincias);
    }

    @GetMapping("/localidades/{codProvincia}")
    public ResponseEntity<List<LocalidadBean>> obtenerLocalidades(@PathVariable String codProvincia) {
        List<LocalidadBean> localidades = indecRepository.getLocalidades(codProvincia);
        return ResponseEntity.ok(localidades);
    }

    @GetMapping("/sucursales/{nroLocalidad}")
    public ResponseEntity<List<SucursalBean>> obtenerSucursales(@PathVariable int nroLocalidad) {
        List<SucursalBean> sucursales = indecRepository.getSucursalesXlocalidad(nroLocalidad);
        return ResponseEntity.ok(sucursales);
    }

    @GetMapping("/rubros/{codIdioma}")
    public ResponseEntity<List<RubrosBean>> obtenerRubros(@PathVariable int codIdioma) {
        List<RubrosBean> rubros = indecRepository.getRubros(codIdioma);
        return ResponseEntity.ok(rubros);
    }

    @GetMapping("/categorias/{nroRubro}/{codIdioma}")
    public ResponseEntity<List<CategoriasBean>> obtenerCategorias(@PathVariable int nroRubro, @PathVariable int codIdioma) {
        List<CategoriasBean> categorias = indecRepository.getCategorias(nroRubro, codIdioma);
        return ResponseEntity.ok(categorias);
    }

    @GetMapping("/marcas")
    public ResponseEntity<List<MarcasBean>> obtenerMarcas() {
        List<MarcasBean> marcas = indecRepository.getMarcas();
        return ResponseEntity.ok(marcas);
    }

    @GetMapping("/tiposProductos/{codIdioma}")
    public ResponseEntity<List<TiposProductosBean>> obtenerTiposProductos(@PathVariable int codIdioma) {
        List<TiposProductosBean> tipo = indecRepository.getTiposProductos(codIdioma);
        return ResponseEntity.ok(tipo);
    }


    @GetMapping("/comparar/{nroLocalidad}/{codBarras}")
    public ResponseEntity<List<ResultadosBean>> compararPrecios(@PathVariable int nroLocalidad, @PathVariable String codBarras) {
        List<ResultadosBean> resultados = indecRepository.compararPrecios(nroLocalidad, codBarras);
        return ResponseEntity.ok(resultados);
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<ProductosBean>> buscarProductos(
            @RequestParam(value = "filtro", required = false) String filtro,
            @RequestParam(value = "filtro_categorias", required = false) String filtroCategorias,
            @RequestParam(value = "filtro_marca", required = false) String filtroMarca,
            @RequestParam(value = "filtro_tipo", required = false) String filtroTipo) {
        List<ProductosBean> resultadoBusqueda = indecRepository.buscarProductos(filtro, filtroCategorias, filtroMarca, filtroTipo);
        return ResponseEntity.ok(resultadoBusqueda);
    }

    @GetMapping("/productos")
    public ResponseEntity<List<ProductosBean>> obtenerProductosSupermercados() {
        List<ProductosBean> productos = indecRepository.getProductosSupermercados();
        return ResponseEntity.ok(productos);
    }
}


