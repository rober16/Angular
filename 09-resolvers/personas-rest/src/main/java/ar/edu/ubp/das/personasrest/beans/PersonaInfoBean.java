package ar.edu.ubp.das.personasrest.beans;

import com.google.gson.Gson;
import java.util.Date;

public class PersonaInfoBean {

    private static final Gson gson = new Gson();

    private String apellido;
    private String nombre;
    private String clave;
    private String correo;
    private String codGenero;
    private String fechaNacimiento;
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

    public String getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(String fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getCodNacionalidad() {
        return codNacionalidad;
    }

    public void setCodNacionalidad(String codNacionalidad) {
        this.codNacionalidad = codNacionalidad;
    }

    public String getEquipos() {
        if(equipos != null) {
            return gson.toJson(equipos);
        }
        return null;
    }

    public void setEquipos(short[] equipos) {
        this.equipos = equipos;
    }

    public String getActividades() {
        if(actividades != null) {
            return gson.toJson(actividades);
        }
        return null;
    }

    public void setActividades(short[] actividades) {
        this.actividades = actividades;
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

}
