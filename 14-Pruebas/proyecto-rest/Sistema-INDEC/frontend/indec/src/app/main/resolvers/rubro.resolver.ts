import { ResolveFn } from '@angular/router';
import { IRubros } from '../api/models/i-rubros';
import { ProductosResourceService } from '../api/resources/productos-resource.service';
import { inject } from '@angular/core';

export const rubroResolver: ResolveFn<IRubros[]> = (route, state) => {
  return inject(ProductosResourceService).getRubros();
};

