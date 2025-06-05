
package ar.edu.ubp.das.superdiscows.services.jaxws;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlType;

@XmlRootElement(name = "ObtenerProductosResponse", namespace = "http://services.superdiscows.das.ubp.edu.ar/")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ObtenerProductosResponse", namespace = "http://services.superdiscows.das.ubp.edu.ar/")
public class ObtenerProductosResponse {

    @XmlElement(name = "ProductosResponse", namespace = "")
    private String productosResponse;

    /**
     * 
     * @return
     *     returns String
     */
    public String getProductosResponse() {
        return this.productosResponse;
    }

    /**
     * 
     * @param productosResponse
     *     the value for the productosResponse property
     */
    public void setProductosResponse(String productosResponse) {
        this.productosResponse = productosResponse;
    }

}
