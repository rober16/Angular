package ar.edu.ubp.das.supermercadocaracolrest.beans;

public class ProductosBean {
    private String codBarra;
    private String nomProducto;
    private String descProducto;
    private Integer nroCategoria;
    private String imagen;
    private Integer nroMarca;
    private Integer nroTipoProducto;
    private String nomSucursal;

    public String getCodBarra() {
        return codBarra;
    }

    public void setCodBarra(String codBarra) {
        this.codBarra = codBarra;
    }

    public String getNomProducto() {
        return nomProducto;
    }

    public void setNomProducto(String nomProducto) {
        this.nomProducto = nomProducto;
    }

    public String getDescProducto() {
        return descProducto;
    }

    public void setDescProducto(String descProducto) {
        this.descProducto = descProducto;
    }

    public Integer getNroCategoria() {
        return nroCategoria;
    }

    public void setNroCategoria(Integer nroCategoria) {
        this.nroCategoria = nroCategoria;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public Integer getNroMarca() {
        return nroMarca;
    }

    public void setNroMarca(Integer nroMarca) {
        this.nroMarca = nroMarca;
    }

    public Integer getNroTipoProducto() {
        return nroTipoProducto;
    }

    public void setNroTipoProducto(Integer nroTipoProducto) {
        this.nroTipoProducto = nroTipoProducto;
    }

    public String getNomSucursal() {
        return nomSucursal;
    }

    public void setNomSucursal(String nomSucursal) {
        this.nomSucursal = nomSucursal;
    }
}
