package ar.edu.ubp.das.personasrest.resources;
import ar.edu.ubp.das.personasrest.beans.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ar.edu.ubp.das.personasrest.repositories.PersonasRepository;

import java.util.List;

@RestController
@RequestMapping("/personas")
public class PersonasResource {

    @Autowired
    private PersonasRepository personasRepository;

    @GetMapping("/generos")
    public ResponseEntity<List<GeneroBean>> getGeneros() {
        List<GeneroBean> generos = personasRepository.getGeneros();
        return ResponseEntity.ok(generos);
    }

    @GetMapping("/nacionalidades")
    public ResponseEntity<List<NacionalidadBean>> getNacionalidades() {
        List<NacionalidadBean> nacionalidades = personasRepository.getNacionalidades();
        return ResponseEntity.ok(nacionalidades);
    }

    @GetMapping("/equipos")
    public ResponseEntity<List<EquipoBean>> getEquipos() {
        List<EquipoBean> equipos = personasRepository.getEquipos();
        return ResponseEntity.ok(equipos);
    }

    @GetMapping("/actividades")
    public ResponseEntity<List<ActividadBean>> getActividades() {
        List<ActividadBean> actividades = personasRepository.getActividades();
        return ResponseEntity.ok(actividades);
    }

    @GetMapping("/listado")
    public ResponseEntity<List<PersonaBean>> getPersonas() {
        List<PersonaBean> personas = personasRepository.getPersonas();
        return ResponseEntity.ok(personas);
    }

    @GetMapping("/persona/{idPersona}")
    public ResponseEntity<PersonaDataBean> getDatosPersona(@PathVariable String idPersona) {
        return ResponseEntity.ok(personasRepository.getDatosPersona(idPersona));
    }

    @PostMapping("/persona")
    public ResponseEntity actPersona(@RequestBody PersonaInfoBean info) {
        if(info.getNroPersona() > 0) {
            personasRepository.actPersona(info);
        }
        else {
            personasRepository.insPersona(info);
        }
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/persona/{idPersona}")
    public ResponseEntity delPersona(@PathVariable String idPersona) {
        personasRepository.delPersona(idPersona);
        return ResponseEntity.ok().build();
    }

}
