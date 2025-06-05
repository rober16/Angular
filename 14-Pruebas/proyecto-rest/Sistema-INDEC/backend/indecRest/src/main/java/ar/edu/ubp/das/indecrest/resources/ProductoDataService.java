package ar.edu.ubp.das.indecrest.resources;
import ar.edu.ubp.das.indecrest.beans.ProductosBean;
import ar.edu.ubp.das.indecrest.beans.ServiciosBean;
import com.google.gson.reflect.TypeToken;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
class ProductoDataService extends AbstractDataService {

    @Override
    protected void procesarServicio(ServiciosBean servicio) {
        String productos = null;

        if ("REST".equals(servicio.getTipoServicio())) {
            productos = obtenerDatosRest(servicio, "/productos", new TypeToken<List<ProductosBean>>() {});
        } else if ("SOAP".equals(servicio.getTipoServicio())) {
            productos = obtenerDatosSoap(servicio, "ObtenerProductosRequest", ProductosBean.class, "ObtenerProductosResponse");
        }

        if (productos != null) {
            System.out.println(productos);
            guardarDatos(productos, servicio.getNroSupermercado(), "Productos");
            System.out.println("Productos del servicio " + servicio.getUrlServicio() + " procesadas exitosamente");
        }
    }
}