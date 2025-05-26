package ar.edu.ubp.das.personasrest.repositories;
import ar.edu.ubp.das.personasrest.components.SimpleJdbcCallFactory;
import ar.edu.ubp.das.personasrest.beans.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PersonasRepository {

    @Autowired
    private SimpleJdbcCallFactory jdbcCallFactory;

    public List<GeneroBean> getGeneros() {
        return jdbcCallFactory.executeQuery("get_generos", "dbo", "generos", GeneroBean.class);
    }

    public List<NacionalidadBean> getNacionalidades() {
        return jdbcCallFactory.executeQuery("get_nacionalidades", "dbo", "generos", NacionalidadBean.class);
    }

    public List<EquipoBean> getEquipos() {
        return jdbcCallFactory.executeQuery("get_equipos", "dbo", "equipos", EquipoBean.class);
    }

    public List<ActividadBean> getActividades() {
        return jdbcCallFactory.executeQuery("get_actividades", "dbo", "actividades", ActividadBean.class);
    }

    public List<PersonaBean> getPersonas() {
        return jdbcCallFactory.executeQuery("get_personas", "dbo", "personas", PersonaBean.class);
    }

    public PersonaDataBean getDatosPersona(String idPersona) {
        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("id_persona", idPersona);
        List<PersonaDataBean> datos = jdbcCallFactory.executeQuery("get_datos_persona", "dbo", params, "datos", PersonaDataBean.class);
        if(datos.size() > 0 ){
            return datos.get(0);
        }
        return null;
    }

    public void insPersona(PersonaInfoBean data) {
        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("apellido", data.getApellido())
                .addValue("nombre", data.getNombre())
                .addValue("clave", data.getClave())
                .addValue("correo", data.getCorreo())
                .addValue("cod_genero", data.getCodGenero())
                .addValue("fecha_nacimiento", data.getFechaNacimiento())
                .addValue("cod_nacionalidad", data.getCodNacionalidad())
                .addValue("equipos", data.getEquipos())
                .addValue("actividades", data.getActividades())
                .addValue("otras_actividades", data.getOtrasActividades());

        jdbcCallFactory.execute("ins_persona", "dbo", params);
    }

    public void actPersona(PersonaInfoBean data) {
        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("nro_persona", data.getNroPersona())
                .addValue("apellido", data.getApellido())
                .addValue("nombre", data.getNombre())
                .addValue("clave", data.getClave())
                .addValue("correo", data.getCorreo())
                .addValue("cod_genero", data.getCodGenero())
                .addValue("fecha_nacimiento", data.getFechaNacimiento())
                .addValue("cod_nacionalidad", data.getCodNacionalidad())
                .addValue("equipos", data.getEquipos())
                .addValue("actividades", data.getActividades())
                .addValue("otras_actividades", data.getOtrasActividades());

        jdbcCallFactory.execute("act_persona", "dbo", params);
    }

    public void delPersona(String idPersona) {
        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("id_persona", idPersona);
        jdbcCallFactory.execute("del_persona", "dbo", params);
    }

}
