import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-descartar',
  standalone: true,
  imports: [],
  templateUrl: './modal-descartar.component.html',
  styleUrl: './modal-descartar.component.css'
})
export class ModalDescartarComponent {

  constructor(private _activeModal: NgbActiveModal) { }

  aceptar(): void {
    this._activeModal.close(true);
  }

  cerrar(): void {
    this._activeModal.close(false);
  }

}
