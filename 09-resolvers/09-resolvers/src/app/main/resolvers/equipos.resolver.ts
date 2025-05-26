import { ResolveFn } from '@angular/router';
import { PersonasResourceService } from '../api/resources/personas-resource.service';
import { inject } from '@angular/core';
import { IEquipo } from '../api/models/i-equipo';

export const equiposResolver: ResolveFn<IEquipo[]> = (route, state) => {
  return inject(PersonasResourceService).getEquipos();
};
