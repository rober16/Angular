package ar.edu.ubp.das.indecrest.resources;
import ar.edu.ubp.das.indecrest.beans.PreciosBean;
import ar.edu.ubp.das.indecrest.beans.ServiciosBean;
import com.google.gson.reflect.TypeToken;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
class PrecioDataService extends AbstractDataService {

    @Override
    protected void procesarServicio(ServiciosBean servicio) {
        String precios = null;

        if ("REST".equals(servicio.getTipoServicio())) {
            precios = obtenerDatosRest(servicio, "/precios", new TypeToken<List<PreciosBean>>() {});
        } else if ("SOAP".equals(servicio.getTipoServicio())) {
            precios = obtenerDatosSoap(servicio, "ObtenerPreciosRequest", PreciosBean.class, "ObtenerPreciosResponse");
        }

        if (precios != null) {
            System.out.println(precios);
            guardarDatos(precios, servicio.getNroSupermercado(), "Precios");
            System.out.println("Precios del servicio " + servicio.getUrlServicio() + " procesadas exitosamente");
        }
    }
}