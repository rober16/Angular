package ar.edu.ubp.das.superveaws.endpoints;
import ar.edu.ubp.das.superveaws.beans.*;
import ar.edu.ubp.das.superveaws.services.SuperVeaWS;
import ar.edu.ubp.das.superveaws.services.jaxws.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

import java.util.List;

@Endpoint
public class SuperVeaEndpoint {
    private static final String NAMESPACE_URI = "http://services.superveaws.das.ubp.edu.ar/";

    @Autowired
    private SuperVeaWS service;

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
