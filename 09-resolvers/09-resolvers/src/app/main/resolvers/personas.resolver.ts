import { ResolveFn } from '@angular/router';
import { PersonasResourceService } from '../api/resources/personas-resource.service';
import { inject } from '@angular/core';
import { IPersona } from '../api/models/i-persona';

export const personasResolver: ResolveFn<IPersona[]> = (route, state) => {
  return inject(PersonasResourceService).getPersonas();
};
