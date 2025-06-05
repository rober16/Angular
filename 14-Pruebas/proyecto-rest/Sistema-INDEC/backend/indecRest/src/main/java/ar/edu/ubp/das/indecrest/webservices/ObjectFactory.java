
package ar.edu.ubp.das.indecrest.webservices;

import javax.xml.namespace.QName;
import jakarta.xml.bind.JAXBElement;
import jakarta.xml.bind.annotation.XmlElementDecl;
import jakarta.xml.bind.annotation.XmlRegistry;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the ar.edu.ubp.das.indecrest.webservices package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _ObtenerSucursalesRequest_QNAME = new QName("http://services.superdiscows.das.ubp.edu.ar/", "ObtenerSucursalesRequest");
    private final static QName _ObtenerSucursalesResponse_QNAME = new QName("http://services.superdiscows.das.ubp.edu.ar/", "ObtenerSucursalesResponse");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: ar.edu.ubp.das.indecrest.webservices
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link ObtenerSucursalesRequest }
     * 
     */
    public ObtenerSucursalesRequest createObtenerSucursalesRequest() {
        return new ObtenerSucursalesRequest();
    }

    /**
     * Create an instance of {@link ObtenerSucursalesResponse }
     * 
     */
    public ObtenerSucursalesResponse createObtenerSucursalesResponse() {
        return new ObtenerSucursalesResponse();
    }

    /**
     * Create an instance of {@link SucursalBean }
     * 
     */
    public SucursalBean createSucursalBean() {
        return new SucursalBean();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ObtenerSucursalesRequest }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link ObtenerSucursalesRequest }{@code >}
     */
    @XmlElementDecl(namespace = "http://services.superdiscows.das.ubp.edu.ar/", name = "ObtenerSucursalesRequest")
    public JAXBElement<ObtenerSucursalesRequest> createObtenerSucursalesRequest(ObtenerSucursalesRequest value) {
        return new JAXBElement<ObtenerSucursalesRequest>(_ObtenerSucursalesRequest_QNAME, ObtenerSucursalesRequest.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ObtenerSucursalesResponse }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link ObtenerSucursalesResponse }{@code >}
     */
    @XmlElementDecl(namespace = "http://services.superdiscows.das.ubp.edu.ar/", name = "ObtenerSucursalesResponse")
    public JAXBElement<ObtenerSucursalesResponse> createObtenerSucursalesResponse(ObtenerSucursalesResponse value) {
        return new JAXBElement<ObtenerSucursalesResponse>(_ObtenerSucursalesResponse_QNAME, ObtenerSucursalesResponse.class, null, value);
    }

}
