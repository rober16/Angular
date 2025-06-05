package ar.edu.ubp.das.indecrest.resources;
import ar.edu.ubp.das.indecrest.beans.ServiciosBean;
import ar.edu.ubp.das.indecrest.beans.SucursalBean;
import com.google.gson.reflect.TypeToken;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
class SucursalDataService extends AbstractDataService {

    @Override
    protected void procesarServicio(ServiciosBean servicio) {
        String sucursales = null;

        if ("REST".equals(servicio.getTipoServicio())) {
            sucursales = obtenerDatosRest(servicio, "/sucursales", new TypeToken<List<SucursalBean>>() {});
        } else if ("SOAP".equals(servicio.getTipoServicio())) {
            sucursales = obtenerDatosSoap(servicio, "ObtenerSucursalesRequest", SucursalBean.class, "ObtenerSucursalesResponse");
        }

        if (sucursales != null) {
            System.out.println(sucursales);
            guardarDatos(sucursales, servicio.getNroSupermercado(), "Sucursales");
            System.out.println("Sucursales del servicio " + servicio.getUrlServicio() + " procesadas exitosamente");
        }
    }
}