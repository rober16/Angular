import { ResolveFn } from '@angular/router';
import { PersonasResourceService } from '../api/resources/personas-resource.service';
import { inject } from '@angular/core';
import { IPersonaInfo } from '../api/models/i-persona-info';

export const infoResolver: ResolveFn<IPersonaInfo> = (route, state) => {
  return inject(PersonasResourceService).getDatosPersona(route.params["id"]);
};
