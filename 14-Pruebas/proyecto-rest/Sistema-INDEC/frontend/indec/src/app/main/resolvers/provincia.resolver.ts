import { ResolveFn } from '@angular/router';
import { SucursalesResourceService } from '../api/resources/sucursales-resource.service';
import { inject } from '@angular/core';

import { IProvincia } from '../api/models/i-provincia';


export const provinciaResolver: ResolveFn<IProvincia[]> = (route, state) => {
  return inject(SucursalesResourceService).getProvincias();
};


