import { IEquipo } from "../models/i-equipo";
import { IGenero } from "../models/i-genero";
import { IHobby } from "../models/i-hobby";
import { INacionalidad } from "../models/i-nacionalidad";

export class DataResource {

  static generos = [
    <IGenero> {
      codigo: 'F',
      nombre: 'Femenino',
      checked: true
    },
    <IGenero> {
      codigo: 'M',
      nombre: 'Masculino',
      checked: false
    },
    <IGenero> {
      codigo: 'NB',
      nombre: 'No binario',
      checked: false
    }
  ];

  static nacionalidades = [
    <INacionalidad> {
      codigo: 'AR',
      nombre: 'Argentina',
      selected: true
    },
    <INacionalidad> {
      codigo: 'BO',
      nombre: 'Boliviana'
    },
    <INacionalidad> {
      codigo: 'BR',
      nombre: 'Brasileña'
    },
    <INacionalidad> {
      codigo: 'CH',
      nombre: 'Chilena'
    },
    <INacionalidad> {
      codigo: 'CO',
      nombre: 'Colombiana'
    },
    <INacionalidad> {
      codigo: 'EC',
      nombre: 'Ecuatoriana'
    },
    <INacionalidad> {
      codigo: 'PY',
      nombre: 'Paraguaya'
    },
    <INacionalidad> {
      codigo: 'PE',
      nombre: 'Peruana'
    },
    <INacionalidad> {
      codigo: 'UY',
      nombre: 'Uruguaya'
    },
    <INacionalidad> {
      codigo: 'VE',
      nombre: 'Venezolana'
    }
  ];

  static equipos = [
    <IEquipo> {
      codigo: "BE",
      nombre: "Belgrano"
    },
    <IEquipo> {
      codigo: "BJ",
      nombre: "Boca Juniors"
    },
    <IEquipo> {
      codigo: "I",
      nombre: "Instituto"
    },
    <IEquipo> {
      codigo: "L",
      nombre: "Lanús"
    },
    <IEquipo> {
      codigo: "RA",
      nombre: "Racing"
    },
    <IEquipo> {
      codigo: "RP",
      nombre: "River Plate"
    },
    <IEquipo> {
      codigo: "SL",
      nombre: "San Lorenzo"
    },
    <IEquipo> {
      codigo: "T",
      nombre: "Talleres"
    },
    <IEquipo> {
      codigo: "V",
      nombre: "Velez"
    }
  ];

  static hobbies = [
    <IHobby> {
      codigo: "B",
      nombre: "Bailar"
    },
    <IHobby> {
      codigo: "C",
      nombre: "Cantar"
    },
    <IHobby> {
      codigo: "HD",
      nombre: "Hacer deportes"
    },
    <IHobby> {
      codigo: "L",
      nombre: "Leer"
    },
    <IHobby> {
      codigo: 'P',
      nombre: 'Pescar'
    },
    <IHobby> {
      codigo: "VT",
      nombre: "Ver televisión"
    }
  ];

}
