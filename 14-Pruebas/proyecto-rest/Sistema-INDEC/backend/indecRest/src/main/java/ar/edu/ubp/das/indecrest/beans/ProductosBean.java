package ar.edu.ubp.das.indecrest.beans;

import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "ProductosResponse")
public class ProductosBean {
    private String codBarra;
    private String nomProducto;
    private String descProducto;
    private Integer nroCategoria;
    private String imagen;
    private String nomMarca;
    private String nomTipoProducto;
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

    public String getNomMarca() {
        return nomMarca;
    }

    public void setNomMarca(String nomMarca) {
        this.nomMarca = nomMarca;
    }

    public String getNomTipoProducto() {
        return nomTipoProducto;
    }

    public void setNomTipoProducto(String nomTipoProducto) {
        this.nomTipoProducto = nomTipoProducto;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getNomSucursal() {
        return nomSucursal;
    }

    public void setNomSucursal(String nomSucursal) {
        this.nomSucursal = nomSucursal;
    }
}
