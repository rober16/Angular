package ar.edu.ubp.das.indecrest.repositories;
import ar.edu.ubp.das.indecrest.beans.*;
import ar.edu.ubp.das.indecrest.components.SimpleJdbcCallFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class IndecRepository {
    @Autowired
    private SimpleJdbcCallFactory jdbcCallFactory;

    public List<ProvinciaBean> getProvincias() {
        return jdbcCallFactory.executeQuery("get_provincias", "dbo", "provincias", ProvinciaBean.class);
    }

    public List<LocalidadBean> getLocalidades(String codProvincia) {
        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("cod_provincia", codProvincia);
        return jdbcCallFactory.executeQuery("get_localidades", "dbo", params, "localidades", LocalidadBean.class);
    }

    public List<SucursalBean> getSucursalesXlocalidad(int nroLocalidad) {
        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("nro_localidad", nroLocalidad);
        return jdbcCallFactory.executeQuery("get_sucursales", "dbo", params,"sucursales", SucursalBean.class);
    }

    public List<ServiciosBean> getServicios() {
        return jdbcCallFactory.executeQuery("get_servicios", "dbo", "servicios", ServiciosBean.class);
    }

    public List<RubrosBean> getRubros(int codIdioma) {
        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("cod_idioma", codIdioma);
        return jdbcCallFactory.executeQuery("get_rubros", "dbo", params,"rubros", RubrosBean.class);
    }

    public List<CategoriasBean> getCategorias(int nroRubro, int codIdioma) {
        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("nro_rubro", nroRubro)
                .addValue("cod_idioma", codIdioma);
        return jdbcCallFactory.executeQuery("get_categorias", "dbo", params, "categorias", CategoriasBean.class);
    }

    public List<MarcasBean> getMarcas() {
        return jdbcCallFactory.executeQuery("get_marcas", "dbo", "marcas", MarcasBean.class);
    }

    public List<TiposProductosBean> getTiposProductos(int codIdioma) {
        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("cod_idioma", codIdioma);
        return jdbcCallFactory.executeQuery("get_tipos_productos", "dbo", params, "tiposProductos", TiposProductosBean.class);
    }
    
    public void insertarSucursal(String sucursales, int nroSupermercado) {
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("json_sucursales", sucursales)
                .addValue("nro_supermercado", nroSupermercado);
        jdbcCallFactory.execute("sp_abm_sucursales", "dbo", params);
    }

    public void insertarProducto(String productos, int nroSupermercado) {
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("json_productos", productos)
                .addValue("nro_supermercado", nroSupermercado);
        jdbcCallFactory.execute("sp_abm_productos_sucursales", "dbo", params);
    }

    public void insertarPrecios(String precios, int nroSupermercado) {
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("json_precios", precios)
                .addValue("nro_supermercado", nroSupermercado);
        jdbcCallFactory.execute("sp_abm_precios", "dbo", params);
    }

    public List<ResultadosBean> compararPrecios(int nroLocalidad, String codBarras) {
        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("nro_localidad", nroLocalidad)
                .addValue("cod_barras", codBarras);
        return jdbcCallFactory.executeQuery("comparar_precios", "dbo", params,"resultados", ResultadosBean.class);
    }

    public List<ProductosBean> buscarProductos(String filtro, String filtroCategorias, String filtroMarca, String filtroTipo) {
        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("filtro", filtro)
                .addValue("filtro_categorias", filtroCategorias) // Asegúrate de que el nombre del parámetro coincida con el del procedimiento almacenado
                .addValue("filtro_marca", filtroMarca)       // Idem
                .addValue("filtro_tipo", filtroTipo);        // Idem
        return jdbcCallFactory.executeQuery("buscar_productos", "dbo", params,"resultadosBusqueda", ProductosBean.class);
    }

    public List<ProductosBean> getProductosSupermercados() {
        return jdbcCallFactory.executeQuery("get_productos", "dbo", "productos", ProductosBean.class);
    }
}