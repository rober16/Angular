
package ar.edu.ubp.das.superdiscows.services.jaxws;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlType;

@XmlRootElement(name = "ObtenerSucursalesResponse", namespace = "http://services.superdiscows.das.ubp.edu.ar/")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ObtenerSucursalesResponse", namespace = "http://services.superdiscows.das.ubp.edu.ar/")
public class ObtenerSucursalesResponse {

    @XmlElement(name = "SucursalesResponse", namespace = "")
    private String sucursalesResponse;

    /**
     * 
     * @return
     *     returns String
     */
    public String getSucursalesResponse() {
        return this.sucursalesResponse;
    }

    /**
     * 
     * @param sucursalesResponse
     *     the value for the sucursalesResponse property
     */
    public void setSucursalesResponse(String sucursalesResponse) {
        this.sucursalesResponse = sucursalesResponse;
    }

}
