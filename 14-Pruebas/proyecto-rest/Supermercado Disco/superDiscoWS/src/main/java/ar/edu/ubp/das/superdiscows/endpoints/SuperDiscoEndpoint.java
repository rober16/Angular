package ar.edu.ubp.das.superdiscows.endpoints;
import ar.edu.ubp.das.superdiscows.beans.*;
import ar.edu.ubp.das.superdiscows.services.SuperDiscoWS;
import ar.edu.ubp.das.superdiscows.services.jaxws.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

@Endpoint
public class SuperDiscoEndpoint {
    private static final String NAMESPACE_URI = "http://services.superdiscows.das.ubp.edu.ar/";
    @Autowired
    private SuperDiscoWS service;

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "ObtenerSucursalesRequest")
    @ResponsePayload
    public ObtenerSucursalesResponse obtenerSucursales() {
        String sucursales = service.obtenerSucursales();
        ObtenerSucursalesResponse response = new ObtenerSucursalesResponse();
        response.setSucursalesResponse(sucursales);
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "ObtenerProductosRequest")
    @ResponsePayload
    public ObtenerProductosResponse obtenerProdcutos() {
        String productos = service.obtenerProductos();
        ObtenerProductosResponse response = new ObtenerProductosResponse();
        response.setProductosResponse(productos);
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "ObtenerPreciosRequest")
    @ResponsePayload
    public ObtenerPreciosResponse obtenerPrecios() {
        String precios = service.obtenerPrecios();
        ObtenerPreciosResponse response = new ObtenerPreciosResponse();
        response.setPreciosResponse(precios);
        return response;
    }
}
