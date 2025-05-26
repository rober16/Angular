import { IColor } from "../models/i-color";

export class DataResource {

  static colors = [
    <IColor> {
      id: 'iwhite', 
      text: 'Color por defecto', 
      value: 'bg-white'
    },
    <IColor> {
      id: 'iprimary', 
      text: 'Color primario', 
      value: 'bg-primary'
    },
    <IColor> {
      id: 'isecondary', 
      text: 'Color secundario', 
      value: 'bg-secondary'
    },
    <IColor> {
      id: 'ilight', 
      text: 'Color claro', 
      value: 'bg-light'
    },
    <IColor> {
      id: 'idark', 
      text: 'Color oscuro', 
      value: 'bg-dark'
    },
    <IColor> {
      id: 'isuccess', 
      text: 'Color para éxito', 
      value: 'bg-success'
    },
    <IColor> {
      id: 'iinfo', 
      text: 'Color para información', 
      value: 'bg-info'  
    },
    <IColor> {
      id: 'iwarning', 
      text: 'Color para advertencias', 
      value: 'bg-warning'
    },
    <IColor> {
      id: 'idanger', 
      text: 'Color para errores', 
      value: 'bg-danger'
    }
  ]

}

