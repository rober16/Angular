import { ResolveFn } from '@angular/router';
import { PersonasResourceService } from '../api/resources/personas-resource.service';
import { inject } from '@angular/core';
import { INacionalidad } from '../api/models/i-nacionalidad';

export const nacionalidadesResolver: ResolveFn<INacionalidad[]> = (route, state) => {
  return inject(PersonasResourceService).getNacionalidades();
};
