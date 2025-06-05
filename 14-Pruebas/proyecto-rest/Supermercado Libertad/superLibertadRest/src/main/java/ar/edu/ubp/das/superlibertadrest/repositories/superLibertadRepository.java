package ar.edu.ubp.das.superlibertadrest.repositories;
import ar.edu.ubp.das.superlibertadrest.beans.ProductosBean;
import ar.edu.ubp.das.superlibertadrest.beans.SucursalBean;
import ar.edu.ubp.das.superlibertadrest.components.SimpleJdbcCallFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class superLibertadRepository {
    @Autowired
    private SimpleJdbcCallFactory jdbcCallFactory;

    public String getSucursales() {

        try {
            SqlParameterSource in = new MapSqlParameterSource();
            Map<String, Object> out = jdbcCallFactory.executeWithOutputs("enviar_informacion_sucursales","dbo",in);
            List<Map<String, Object>> resultSet = (List<Map<String, Object>>) out.get("#result-set-1");
            Map<String, Object> row = resultSet.get(0);
            String jsonResult = (String)row.get("JSON_SUCURSALES");
            return jsonResult;
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String getProductos() {

        try {
            SqlParameterSource in = new MapSqlParameterSource();
            Map<String, Object> out = jdbcCallFactory.executeWithOutputs("enviar_informacion_productos_sucursales","dbo",in);
            List<Map<String, Object>> resultSet = (List<Map<String, Object>>) out.get("#result-set-1");
            Map<String, Object> row = resultSet.get(0);
            String jsonResult = (String)row.get("JSON_PRODUCTOS_SUCURSALES");
            return jsonResult;

        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String getPrecios() {

        try {
            SqlParameterSource in = new MapSqlParameterSource();
            Map<String, Object> out = jdbcCallFactory.executeWithOutputs("enviar_informacion_precios","dbo",in);
            List<Map<String, Object>> resultSet = (List<Map<String, Object>>) out.get("#result-set-1");
            Map<String, Object> row = resultSet.get(0);
            String jsonResult = (String)row.get("JSON_PRECIOS");
            return jsonResult;

        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
