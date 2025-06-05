
package ar.edu.ubp.das.indecrest.webservices;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlType;


/**
 * <p>Clase Java para sucursalBean complex type.
 * 
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 * 
 * <pre>
 * &lt;complexType name="sucursalBean"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="calle" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="codPais" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="codProvincia" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="coordLatitud" type="{http://www.w3.org/2001/XMLSchema}float"/&gt;
 *         &lt;element name="coordLongitud" type="{http://www.w3.org/2001/XMLSchema}float"/&gt;
 *         &lt;element name="cuit" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="horarioSucursal" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="nomLocalidad" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="nomPais" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="nomProvincia" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="nomSucursal" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="nroCalle" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/&gt;
 *         &lt;element name="nroLocalidad" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/&gt;
 *         &lt;element name="nroSucursal" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/&gt;
 *         &lt;element name="razonSocial" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="serviciosDisponibles" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/&gt;
 *         &lt;element name="telefonos" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "sucursalBean", propOrder = {
    "calle",
    "codPais",
    "codProvincia",
    "coordLatitud",
    "coordLongitud",
    "cuit",
    "horarioSucursal",
    "nomLocalidad",
    "nomPais",
    "nomProvincia",
    "nomSucursal",
    "nroCalle",
    "nroLocalidad",
    "nroSucursal",
    "razonSocial",
    "serviciosDisponibles",
    "telefonos"
})
public class SucursalBean {

    protected String calle;
    protected String codPais;
    protected String codProvincia;
    protected float coordLatitud;
    protected float coordLongitud;
    protected String cuit;
    protected String horarioSucursal;
    protected String nomLocalidad;
    protected String nomPais;
    protected String nomProvincia;
    protected String nomSucursal;
    protected Integer nroCalle;
    protected Integer nroLocalidad;
    protected Integer nroSucursal;
    protected String razonSocial;
    protected Integer serviciosDisponibles;
    protected String telefonos;

    /**
     * Obtiene el valor de la propiedad calle.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCalle() {
        return calle;
    }

    /**
     * Define el valor de la propiedad calle.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCalle(String value) {
        this.calle = value;
    }

    /**
     * Obtiene el valor de la propiedad codPais.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodPais() {
        return codPais;
    }

    /**
     * Define el valor de la propiedad codPais.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodPais(String value) {
        this.codPais = value;
    }

    /**
     * Obtiene el valor de la propiedad codProvincia.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodProvincia() {
        return codProvincia;
    }

    /**
     * Define el valor de la propiedad codProvincia.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodProvincia(String value) {
        this.codProvincia = value;
    }

    /**
     * Obtiene el valor de la propiedad coordLatitud.
     * 
     */
    public float getCoordLatitud() {
        return coordLatitud;
    }

    /**
     * Define el valor de la propiedad coordLatitud.
     * 
     */
    public void setCoordLatitud(float value) {
        this.coordLatitud = value;
    }

    /**
     * Obtiene el valor de la propiedad coordLongitud.
     * 
     */
    public float getCoordLongitud() {
        return coordLongitud;
    }

    /**
     * Define el valor de la propiedad coordLongitud.
     * 
     */
    public void setCoordLongitud(float value) {
        this.coordLongitud = value;
    }

    /**
     * Obtiene el valor de la propiedad cuit.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCuit() {
        return cuit;
    }

    /**
     * Define el valor de la propiedad cuit.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCuit(String value) {
        this.cuit = value;
    }

    /**
     * Obtiene el valor de la propiedad horarioSucursal.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHorarioSucursal() {
        return horarioSucursal;
    }

    /**
     * Define el valor de la propiedad horarioSucursal.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHorarioSucursal(String value) {
        this.horarioSucursal = value;
    }

    /**
     * Obtiene el valor de la propiedad nomLocalidad.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNomLocalidad() {
        return nomLocalidad;
    }

    /**
     * Define el valor de la propiedad nomLocalidad.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNomLocalidad(String value) {
        this.nomLocalidad = value;
    }

    /**
     * Obtiene el valor de la propiedad nomPais.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNomPais() {
        return nomPais;
    }

    /**
     * Define el valor de la propiedad nomPais.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNomPais(String value) {
        this.nomPais = value;
    }

    /**
     * Obtiene el valor de la propiedad nomProvincia.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNomProvincia() {
        return nomProvincia;
    }

    /**
     * Define el valor de la propiedad nomProvincia.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNomProvincia(String value) {
        this.nomProvincia = value;
    }

    /**
     * Obtiene el valor de la propiedad nomSucursal.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNomSucursal() {
        return nomSucursal;
    }

    /**
     * Define el valor de la propiedad nomSucursal.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNomSucursal(String value) {
        this.nomSucursal = value;
    }

    /**
     * Obtiene el valor de la propiedad nroCalle.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getNroCalle() {
        return nroCalle;
    }

    /**
     * Define el valor de la propiedad nroCalle.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setNroCalle(Integer value) {
        this.nroCalle = value;
    }

    /**
     * Obtiene el valor de la propiedad nroLocalidad.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getNroLocalidad() {
        return nroLocalidad;
    }

    /**
     * Define el valor de la propiedad nroLocalidad.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setNroLocalidad(Integer value) {
        this.nroLocalidad = value;
    }

    /**
     * Obtiene el valor de la propiedad nroSucursal.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getNroSucursal() {
        return nroSucursal;
    }

    /**
     * Define el valor de la propiedad nroSucursal.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setNroSucursal(Integer value) {
        this.nroSucursal = value;
    }

    /**
     * Obtiene el valor de la propiedad razonSocial.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRazonSocial() {
        return razonSocial;
    }

    /**
     * Define el valor de la propiedad razonSocial.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRazonSocial(String value) {
        this.razonSocial = value;
    }

    /**
     * Obtiene el valor de la propiedad serviciosDisponibles.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getServiciosDisponibles() {
        return serviciosDisponibles;
    }

    /**
     * Define el valor de la propiedad serviciosDisponibles.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setServiciosDisponibles(Integer value) {
        this.serviciosDisponibles = value;
    }

    /**
     * Obtiene el valor de la propiedad telefonos.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTelefonos() {
        return telefonos;
    }

    /**
     * Define el valor de la propiedad telefonos.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTelefonos(String value) {
        this.telefonos = value;
    }

}
