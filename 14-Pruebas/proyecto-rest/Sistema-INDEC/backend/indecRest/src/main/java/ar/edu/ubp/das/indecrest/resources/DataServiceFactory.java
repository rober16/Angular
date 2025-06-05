package ar.edu.ubp.das.indecrest.resources;

import ar.edu.ubp.das.indecrest.repositories.IndecRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DataServiceFactory {
    @Autowired
    private IndecRepository indecRepository;
    @Autowired
    private SucursalDataService sucursalDataService;
    @Autowired
    private ProductoDataService productoDataService;
    @Autowired
    private PrecioDataService precioDataService;


    public IDataService createDataService(String dataType) {
        switch (dataType) {
            case "Sucursales":
                sucursalDataService.setIndecRepository(indecRepository);
                return sucursalDataService;
            case "Productos":
                productoDataService.setIndecRepository(indecRepository);
                return productoDataService;
            case "Precios":
                precioDataService.setIndecRepository(indecRepository);
                return precioDataService;
            default:
                throw new IllegalArgumentException("Tipo de dato no soportado: " + dataType);
        }
    }
}