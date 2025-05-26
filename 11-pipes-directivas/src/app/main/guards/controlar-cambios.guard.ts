import { CanDeactivateFn } from '@angular/router';
import { FormularioComponent } from '../pages/formulario/formulario.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDescartarComponent } from '../components/modal-descartar/modal-descartar.component';
import { inject } from '@angular/core';

export const controlarCambiosGuard: CanDeactivateFn<FormularioComponent> = 
  (component, currentRoute, currentState, nextState) => {
  
  const modalService = inject(NgbModal);

  if (!component.form.dirty || component.iForm.submitted) {
    return true;
  }

  const modalRef = modalService.open(ModalDescartarComponent);
  return modalRef.result.then((result: boolean) => {
    return result;
  })
  .catch(() => {
    return false;
  });
  
};
