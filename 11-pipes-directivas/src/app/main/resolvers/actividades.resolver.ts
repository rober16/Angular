import { ResolveFn } from '@angular/router';
import { IActividad } from '../api/models/i-actividad';
import { PersonasResourceService } from '../api/resources/personas-resource.service';
import { inject } from '@angular/core';

export const actividadesResolver: ResolveFn<IActividad[]> = (route, state) => {
  return inject(PersonasResourceService).getActivdades();
};
