
package ar.edu.ubp.das.indecrest.webservices;

import java.util.ArrayList;
import java.util.List;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlType;


/**
 * <p>Clase Java para ObtenerSucursalesResponse complex type.
 * 
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 * 
 * <pre>
 * &lt;complexType name="ObtenerSucursalesResponse"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="SucursalesResponse" type="{http://services.superdiscows.das.ubp.edu.ar/}sucursalBean" maxOccurs="unbounded" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ObtenerSucursalesResponse", propOrder = {
    "sucursalesResponse"
})
public class ObtenerSucursalesResponse {

    @XmlElement(name = "SucursalesResponse")
    protected List<SucursalBean> sucursalesResponse;

    /**
     * Gets the value of the sucursalesResponse property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the Jakarta XML Binding object.
     * This is why there is not a <CODE>set</CODE> method for the sucursalesResponse property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getSucursalesResponse().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link SucursalBean }
     * 
     * 
     */
    public List<SucursalBean> getSucursalesResponse() {
        if (sucursalesResponse == null) {
            sucursalesResponse = new ArrayList<SucursalBean>();
        }
        return this.sucursalesResponse;
    }

}
