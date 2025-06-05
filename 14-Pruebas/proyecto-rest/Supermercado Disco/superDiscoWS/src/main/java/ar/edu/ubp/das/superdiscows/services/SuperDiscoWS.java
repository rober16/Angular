package ar.edu.ubp.das.superdiscows.services;
import ar.edu.ubp.das.superdiscows.repositories.SuperDiscoRepository;
import ar.edu.ubp.das.superdiscows.beans.*;
import jakarta.jws.WebMethod;
import jakarta.jws.WebResult;
import jakarta.jws.WebService;
import jakarta.xml.ws.RequestWrapper;
import jakarta.xml.ws.ResponseWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@WebService(serviceName = "SuperDiscoWS", targetNamespace = "http://services.superdiscows.das.ubp.edu.ar/")
public class SuperDiscoWS {
    @Autowired
    private SuperDiscoRepository superDiscoRepository;

    @WebMethod(operationName = "ObtenerSucursales")
    @RequestWrapper(localName = "ObtenerSucursalesRequest")
    @ResponseWrapper(localName = "ObtenerSucursalesResponse")
    @WebResult(name = "SucursalesResponse")
    public String obtenerSucursales() {
        return superDiscoRepository.getSucursales();
    }

    @WebMethod(operationName = "ObtenerProductos")
    @RequestWrapper(localName = "ObtenerProductosRequest")
    @ResponseWrapper(localName = "ObtenerProductosResponse")
    @WebResult(name = "ProductosResponse")
    public String obtenerProductos() {
        return superDiscoRepository.getProductos();
    }

    @WebMethod(operationName = "ObtenerPrecios")
    @RequestWrapper(localName = "ObtenerPreciosRequest")
    @ResponseWrapper(localName = "ObtenerPreciosResponse")
    @WebResult(name = "PreciosResponse")
    public String obtenerPrecios() {
        return superDiscoRepository.getPrecios();
    }

}
