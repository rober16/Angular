package ar.edu.ubp.das.personasrest.beans;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.util.Date;

public class PersonaDataBean {

    private static final Gson gson = new Gson();

    private String apellido;
    private String nombre;
    private String clave;
    private String correo;
    private String codGenero;
    private Date fechaNacimiento;
    private String codNacionalidad;
    private short[] equipos;
    private short[] actividades;
    private String otrasActividades;
    private int nroPersona;

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getCodGenero() {
        return codGenero;
    }

    public void setCodGenero(String codGenero) {
        this.codGenero = codGenero;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getCodNacionalidad() {
        return codNacionalidad;
    }

    public void setCodNacionalidad(String codNacionalidad) {
        this.codNacionalidad = codNacionalidad;
    }

    public short[] getEquipos() {
        return equipos;
    }

    public void setEquiposJson(String equiposJson) {
        this.equipos = parseJsonToList(equiposJson);
    }

    public short[] getActividades() {
        return actividades;
    }

    public void setActividadesJson(String actividadesJson) {
        this.actividades = parseJsonToList(actividadesJson);
    }

    public String getOtrasActividades() {
        return otrasActividades;
    }

    public void setOtrasActividades(String otrasActividades) {
        this.otrasActividades = otrasActividades;
    }

    public int getNroPersona() {
        return nroPersona;
    }

    public void setNroPersona(int nroPersona) {
        this.nroPersona = nroPersona;
    }

    private short[] parseJsonToList(String json) {
        if (json != null) {
            return gson.fromJson(json, new TypeToken<short[]>(){}.getType());
        }
        return null;
    }

}
