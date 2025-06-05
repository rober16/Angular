package ar.edu.ubp.das.superlibertadrest.resources;
import ar.edu.ubp.das.superlibertadrest.beans.SucursalBean;
import ar.edu.ubp.das.superlibertadrest.beans.ProductosBean;
import ar.edu.ubp.das.superlibertadrest.repositories.superLibertadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/superlibertad", produces = { MediaType.APPLICATION_JSON_VALUE})
public class superLibertadResource {

    @Autowired
    private superLibertadRepository superLibertadRepository;

    @GetMapping("/sucursales")
    public ResponseEntity<?> obtenerSucursales(){
        return new ResponseEntity<>(superLibertadRepository.getSucursales(), HttpStatus.OK);
    }

    @GetMapping("/productos")
    public ResponseEntity<?> obtenerProductos(){
        return new ResponseEntity<>(superLibertadRepository.getProductos(), HttpStatus.OK);
    }

    @GetMapping("/precios")
    public ResponseEntity<?> obtenerPrecios(){
        return new ResponseEntity<>(superLibertadRepository.getPrecios(), HttpStatus.OK);
    }
}
