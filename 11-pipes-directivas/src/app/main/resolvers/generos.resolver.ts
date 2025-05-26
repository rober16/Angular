import { ResolveFn } from '@angular/router';
import { IGenero } from '../api/models/i-genero';
import { inject } from '@angular/core';
import { PersonasResourceService } from '../api/resources/personas-resource.service';

export const generosResolver: ResolveFn<IGenero[]> = (route, state) => {
  return inject(PersonasResourceService).getGeneros();
};
