package ar.edu.ubp.das.indecrest.beans;
import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "SucursalesResponse")
public class SucursalBean {
    private Integer nroSucursal;
    private String nomSucursal;
    private String calle;
    private Integer nroCalle;
    private String telefonos;
    private String coordLatitud;
    private String coordLongitud;
    private String horarioSucursal;
    private String serviciosDisponibles;
    private Integer nroLocalidad;

    public Integer getNroSucursal() {
        return nroSucursal;
    }

    public void setNroSucursal(Integer nroSucursal) {
        this.nroSucursal = nroSucursal;
    }

    public String getNomSucursal() {
        return nomSucursal;
    }

    public void setNomSucursal(String nomSucursal) {
        this.nomSucursal = nomSucursal;
    }

    public Integer getNroCalle() {
        return nroCalle;
    }

    public void setNroCalle(Integer nroCalle) {
        this.nroCalle = nroCalle;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public String getTelefonos() {
        return telefonos;
    }

    public void setTelefonos(String telefonos) {
        this.telefonos = telefonos;
    }

    public String getCoordLongitud() {
        return coordLongitud;
    }

    public void setCoordLongitud(String coordLongitud) {
        this.coordLongitud = coordLongitud;
    }

    public String getCoordLatitud() {
        return coordLatitud;
    }

    public void setCoordLatitud(String coordLatitud) {
        this.coordLatitud = coordLatitud;
    }

    public String getHorarioSucursal() {
        return horarioSucursal;
    }

    public void setHorarioSucursal(String horarioSucursal) {
        this.horarioSucursal = horarioSucursal;
    }

    public String getServiciosDisponibles() {
        return serviciosDisponibles;
    }

    public void setServiciosDisponibles(String serviciosDisponibles) {
        this.serviciosDisponibles = serviciosDisponibles;
    }

    public Integer getNroLocalidad() {
        return nroLocalidad;
    }

    public void setNroLocalidad(Integer nroLocalidad) {
        this.nroLocalidad = nroLocalidad;
    }
}