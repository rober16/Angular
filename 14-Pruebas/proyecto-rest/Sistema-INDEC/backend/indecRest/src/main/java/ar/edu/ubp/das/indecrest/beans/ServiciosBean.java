package ar.edu.ubp.das.indecrest.beans;

public class ServiciosBean {
    private int nroSupermercado;
    private String urlServicio;
    private String tipoServicio;
    private String tokenServicio;
    private String fechaUltActServicio;
    private String nameSpaceSoap;
    private String serviceNameSoap;
    private String portNameSoap;

    public int getNroSupermercado() {
        return nroSupermercado;
    }

    public void setNroSupermercado(int nroSupermercado) {
        this.nroSupermercado = nroSupermercado;
    }

    public String getUrlServicio() {
        return urlServicio;
    }

    public void setUrlServicio(String urlServicio) {
        this.urlServicio = urlServicio;
    }

    public String getTokenServicio() {
        return tokenServicio;
    }

    public void setTokenServicio(String tokenServicio) {
        this.tokenServicio = tokenServicio;
    }

    public String getTipoServicio() {
        return tipoServicio;
    }

    public void setTipoServicio(String tipoServicio) {
        this.tipoServicio = tipoServicio;
    }

    public String getFechaUltActServicio() {
        return fechaUltActServicio;
    }

    public void setFechaUltActServicio(String fechaUltActServicio) {
        this.fechaUltActServicio = fechaUltActServicio;
    }

    public String getNameSpaceSoap() {
        return nameSpaceSoap;
    }

    public void setNameSpaceSoap(String nameSpaceSoap) {
        this.nameSpaceSoap = nameSpaceSoap;
    }

    public String getServiceNameSoap() {
        return serviceNameSoap;
    }

    public void setServiceNameSoap(String serviceNameSoap) {
        this.serviceNameSoap = serviceNameSoap;
    }

    public String getPortNameSoap() {
        return portNameSoap;
    }

    public void setPortNameSoap(String portNameSoap) {
        this.portNameSoap = portNameSoap;
    }
}
