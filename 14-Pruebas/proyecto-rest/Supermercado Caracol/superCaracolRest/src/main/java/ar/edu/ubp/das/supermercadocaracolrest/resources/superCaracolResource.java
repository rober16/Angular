package ar.edu.ubp.das.supermercadocaracolrest.resources;
import ar.edu.ubp.das.supermercadocaracolrest.beans.SucursalBean;
import ar.edu.ubp.das.supermercadocaracolrest.beans.ProductosBean;
import ar.edu.ubp.das.supermercadocaracolrest.repositories.superCaracolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;

import java.util.List;

@RestController
@RequestMapping(path = "/supercaracol", produces = { MediaType.APPLICATION_JSON_VALUE})
public class superCaracolResource {

    @Autowired
    private superCaracolRepository superCaracolRepository;

    @GetMapping("/sucursales")
    public ResponseEntity<?> obtenerSucursales(){
        return new ResponseEntity<>(superCaracolRepository.getSucursales(), HttpStatus.OK);
    }

    @GetMapping("/productos")
    public ResponseEntity<?> obtenerProductos(){
        return new ResponseEntity<>(superCaracolRepository.getProductos(), HttpStatus.OK);
    }

    @GetMapping("/precios")
    public ResponseEntity<?> obtenerPrecios(){
        return new ResponseEntity<>(superCaracolRepository.getPrecios(), HttpStatus.OK);
    }
}
