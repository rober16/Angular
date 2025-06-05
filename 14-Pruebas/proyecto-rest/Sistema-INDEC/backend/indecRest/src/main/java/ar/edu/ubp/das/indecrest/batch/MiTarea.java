package ar.edu.ubp.das.indecrest.batch;
import ar.edu.ubp.das.indecrest.resources.DataServiceFactory;
import ar.edu.ubp.das.indecrest.resources.IDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MiTarea {

    @Autowired
    private DataServiceFactory dataServiceFactory;

    public void ejecutar() {
        this.procesarDatos("Sucursales");
        this.procesarDatos("Productos");
        this.procesarDatos("Precios");
    }

    private void procesarDatos(final String dataType) {
        System.out.println("Comenzando el proceso de carga de " + dataType);
        try {
            IDataService dataService = dataServiceFactory.createDataService(dataType);
            dataService.loadData();
            System.out.println("Proceso de " + dataType + " finalizado con éxito");
        } catch (Exception error) {
            System.err.println("Fallo durante la ejecución del proceso de " + dataType + ": " + error.getMessage());
            throw new RuntimeException("Se produjo un error al ejecutar el proceso de carga de " + dataType, error);
        }
    }
}