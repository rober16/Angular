
package ar.edu.ubp.das.superveaws.services.jaxws;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlType;

@XmlRootElement(name = "ObtenerPreciosResponse", namespace = "http://services.superveaws.das.ubp.edu.ar/")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ObtenerPreciosResponse", namespace = "http://services.superveaws.das.ubp.edu.ar/")
public class ObtenerPreciosResponse {

    @XmlElement(name = "PreciosResponse", namespace = "")
    private String preciosResponse;

    /**
     * 
     * @return
     *     returns String
     */
    public String getPreciosResponse() {
        return this.preciosResponse;
    }

    /**
     * 
     * @param preciosResponse
     *     the value for the preciosResponse property
     */
    public void setPreciosResponse(String preciosResponse) {
        this.preciosResponse = preciosResponse;
    }

}
