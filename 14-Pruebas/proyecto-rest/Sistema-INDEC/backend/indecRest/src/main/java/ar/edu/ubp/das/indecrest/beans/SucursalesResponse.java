package ar.edu.ubp.das.indecrest.beans;
import ar.edu.ubp.das.indecrest.beans.*;

import java.util.List;

public class SucursalesResponse {
    private List<SucursalBean> sucursales;

    // Getters y setters
    public List<SucursalBean> getSucursales() {
        return sucursales;
    }

    public void setSucursales(List<SucursalBean> sucursales) {
        this.sucursales = sucursales;
    }
}
