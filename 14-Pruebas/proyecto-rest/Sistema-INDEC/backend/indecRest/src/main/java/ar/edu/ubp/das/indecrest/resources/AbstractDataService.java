package ar.edu.ubp.das.indecrest.resources;
import ar.edu.ubp.das.indecrest.beans.ServiciosBean;
import ar.edu.ubp.das.indecrest.repositories.IndecRepository;
import ar.edu.ubp.das.indecrest.utils.Httpful;
import ar.edu.ubp.das.indecrest.utils.SOAPClient;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;
import java.util.List;


public abstract class AbstractDataService implements IDataService {

    @Autowired
    protected Gson gson;

    protected IndecRepository indecRepository;


    public void setIndecRepository(IndecRepository indecRepository) {
        this.indecRepository = indecRepository;
    }

    protected <T> String obtenerDatosRest(ServiciosBean servicio, String path, TypeToken<List<T>> typeToken) {
        try {
            List<T> data = new Httpful(servicio.getUrlServicio())
                    .path(path)
                    .basicAuth("usr_admin", "pwd_admin")
                    .method("GET")
                    .execute(typeToken.getType());
            return gson.toJson(data);

        } catch (RuntimeException e) {
            System.err.println("Error obteniendo datos REST desde " + servicio.getUrlServicio() + ": " + e.getMessage());
            throw new RuntimeException("Error obteniendo datos REST desde " + servicio.getUrlServicio(), e);
        }
    }


    protected <T> String obtenerDatosSoap(ServiciosBean servicio, String operationName, Class<T> clazz, String responseName) {
        SOAPClient client = new SOAPClient.SOAPClientBuilder()
                .wsdlUrl(servicio.getUrlServicio())
                .namespace(servicio.getNameSpaceSoap())
                .serviceName(servicio.getServiceNameSoap())
                .portName(servicio.getPortNameSoap())
                .operationName(operationName)
                .username("usr_admin")
                .password("pwd_admin")
                .build();

        List<String> data = client.callServiceForList(String.class, responseName);

        if (data != null && !data.isEmpty()) {
            String jsonString = data.get(0); // Obtener la cadena con el JSON

            try {
                // Eliminar los corchetes y las comillas dobles al principio y al final si existen.
                jsonString = jsonString.replaceAll("^\\[\"(.*)\"\\]$", "$1");

                JsonArray jsonArray = JsonParser.parseString(jsonString).getAsJsonArray();
                return gson.toJson(jsonArray); // Convertir el JsonArray a String JSON
            } catch (JsonSyntaxException e) {
                // Manejar la excepción si el JSON es inválido
                return "{\"error\": \"Invalid JSON format\"}"; // O lanzar una excepción
            }
        } else {
            return "{\"error\": \"No data received\"}"; // O manejar el caso de lista vacía
        }
        //List<T> data = client.callServiceForList(clazz, responseName);
        //return gson.toJson(data);
    }

    protected void guardarDatos(String data, int nroSupermercado, String tipoDato) {
        try {
            switch (tipoDato) {
                case "Sucursales":
                    indecRepository.insertarSucursal(data, nroSupermercado);
                    break;
                case "Productos":
                    indecRepository.insertarProducto(data, nroSupermercado);
                    break;
                case "Precios":
                    indecRepository.insertarPrecios(data, nroSupermercado);
                    break;
                default:
                    throw new IllegalArgumentException("Tipo de dato no soportado: " + tipoDato);
            }

            System.out.println("Se guardaron los " + tipoDato.toLowerCase() +" para el supermercado " + nroSupermercado);
        } catch (Exception ex) {
            System.err.println("Error al guardar "+ tipoDato.toLowerCase() +" en la base de datos para el supermercado " + nroSupermercado + ": " + ex.getMessage());
        }
    }

    protected abstract void procesarServicio(ServiciosBean servicio);

    @Override
    public void loadData() {
        List<ServiciosBean> servicios = indecRepository.getServicios();
        for (ServiciosBean servicio : servicios) {
            try {
                procesarServicio(servicio);
            } catch (RuntimeException e) {
                System.err.println("Error al obtener o procesar datos del servicio " + servicio.getUrlServicio() + ": " + e.getMessage());
            }
        }
    }
}