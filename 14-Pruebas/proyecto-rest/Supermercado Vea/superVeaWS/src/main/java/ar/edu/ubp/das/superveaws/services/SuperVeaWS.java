package ar.edu.ubp.das.superveaws.services;
import ar.edu.ubp.das.superveaws.repositories.SuperVeaRepository;
import ar.edu.ubp.das.superveaws.beans.*;
import jakarta.jws.WebMethod;
import jakarta.jws.WebResult;
import jakarta.jws.WebService;
import jakarta.xml.ws.RequestWrapper;
import jakarta.xml.ws.ResponseWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@WebService(serviceName = "SuperVeaWS", targetNamespace = "http://services.superveaws.das.ubp.edu.ar/")
public class SuperVeaWS {

    @Autowired
    private SuperVeaRepository superVeaRepository;

    @WebMethod(operationName = "ObtenerSucursales")
    @RequestWrapper(localName = "ObtenerSucursalesRequest")
    @ResponseWrapper(localName = "ObtenerSucursalesResponse")
    @WebResult(name = "SucursalesResponse")
    public String obtenerSucursales() {
        return superVeaRepository.getSucursales();
    }

    @WebMethod(operationName = "ObtenerProductos")
    @RequestWrapper(localName = "ObtenerProductosRequest")
    @ResponseWrapper(localName = "ObtenerProductosResponse")
    @WebResult(name = "ProductosResponse")
    public String obtenerProductos() {
        return superVeaRepository.getProductos();
    }

    @WebMethod(operationName = "ObtenerPrecios")
    @RequestWrapper(localName = "ObtenerPreciosRequest")
    @ResponseWrapper(localName = "ObtenerPreciosResponse")
    @WebResult(name = "PreciosResponse")
    public String obtenerPrecios() {
        return superVeaRepository.getPrecios();
    }

}
